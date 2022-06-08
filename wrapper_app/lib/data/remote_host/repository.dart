import 'package:hive_flutter/hive_flutter.dart';
import 'package:injectable/injectable.dart';

import '__.dart';

/// Here dep injection stops, no datasource abstraction applied because
/// currently it is stored within hive box only

@lazySingleton
class RemoteHostRepo {
  final Box<RemoteHost> _remoteHostSource;

  const RemoteHostRepo(this._remoteHostSource);

  RemoteHost get remoteHost => _remoteHostSource.get(0) ?? RemoteHost();

  set remoteHost(RemoteHost host) {
    _remoteHostSource.put(0, host);
  }
}
