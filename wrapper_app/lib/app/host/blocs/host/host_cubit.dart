import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../../data/remote_host/__.dart';

@lazySingleton
class HostCubit extends Cubit<RemoteHost> {
  final RemoteHostRepo _remoteHostRepo;

  HostCubit(this._remoteHostRepo) : super(_remoteHostRepo.remoteHost);

  void updateHost(RemoteHost host) {
    emit(_remoteHostRepo.remoteHost = host);
  }
}
