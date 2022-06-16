import 'package:hive_flutter/hive_flutter.dart';
import 'package:injectable/injectable.dart';

import '../../data/remote_host/models/remote_host.dart';

@module
abstract class AppStorage {
  @preResolve
  @singleton
  Future<HiveInterface> get storage async {
    await Hive.initFlutter();
    Hive.registerAdapter(RemoteHostAdapter());

    return Hive;
  }

  @preResolve
  @lazySingleton
  Future<Box<RemoteHost>> remoteHostStorage(HiveInterface storage) async =>
      await storage.openBox<RemoteHost>("remote_host");
}
