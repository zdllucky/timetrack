import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart';
import 'package:injectable/injectable.dart';

import '../../../../data/remote_host/__.dart';

@lazySingleton
class HostCubit extends Cubit<RemoteHost> {
  final RemoteHostRepo _remoteHostRepo;

  HostCubit(this._remoteHostRepo) : super(_remoteHostRepo.remoteHost);

  @override
  void onChange(Change<RemoteHost> change) {
    super.onChange(change);

    debugPrint(change.nextState.uri.toString());

    _remoteHostRepo.remoteHost = change.nextState;
  }

  void updateHost(RemoteHost host) {
    emit(host);
  }
}
