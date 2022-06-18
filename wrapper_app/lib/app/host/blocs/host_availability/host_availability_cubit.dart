import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:pub_semver/pub_semver.dart';

import '../../../../injectable/injections.dart';
import '../host/host_cubit.dart';

part 'host_availability_state.dart';

/// TODO: Provide test coverage.

@lazySingleton
class HostAvailabilityCubit extends Cubit<HostAvailabilityState> {
  final HostCubit hostCubit;

  HostAvailabilityCubit(this.hostCubit) : super(const HostNotLoaded());

  void hostLoading() => emit(const HostLoading());

  void hostLoaded() => emit(HostLoaded());

  void hostLoadError(String path, int? code, String? message) =>
      emit(HostLoadError(path, code, message));

  Future<void> checkHost() async {
    emit(const HostChecking());
    final hostUri = hostCubit.state.uri;

    if (get<HostCubit>().state.uri.isEmpty) {
      emit(const HostNotLoaded());
      return;
    }

    final Uri uri =
        Uri.parse(hostUri).replace(port: 4000, path: 'health', query: null);

    try {
      Response res = await Dio().get(uri.toString());
      Map<String, dynamic> data = res.data;

      if (data['status'] == null) {
        emit(const HostCompatibilityError(null));
      } else if (data['status'] != 'up') {
        emit(HostLiveCheckError(DioError(
            requestOptions: res.requestOptions,
            response: res,
            error: AssertionError())));
      } else if (!VersionConstraint.parse(data['client']['version'])
          .allows(Version.parse((await PackageInfo.fromPlatform()).version))) {
        emit(HostVersionIncompatible(DioError(
            requestOptions: res.requestOptions,
            response: res,
            error: AssertionError())));
      } else {
        emit(const HostAvailable());
      }
    } on DioError catch (e) {
      switch (e.type) {
        case DioErrorType.sendTimeout:
          emit(NoInternetConnectionError(e));
          break;
        case DioErrorType.connectTimeout:
        case DioErrorType.receiveTimeout:
          emit(HostConnectionError(e));
          break;
        case DioErrorType.response:
          {
            if ([
              401,
              403,
              407,
              409,
            ].contains(e.response?.statusCode)) {
              emit(HostClientError(e));
            } else if (e.response?.statusCode != null &&
                e.response!.statusCode! >= 400 &&
                e.response!.statusCode! < 500) {
              emit(HostCompatibilityError(e));
            } else if (e.response?.statusCode != null &&
                e.response!.statusCode! >= 500) {
              emit(HostServerError(e));
            }
          }
          break;
        case DioErrorType.cancel:
          emit(ConnectionCancelledError(e));
          break;
        case DioErrorType.other:
          emit(HostConnectionError(e));
          break;
      }
    }
  }
}
