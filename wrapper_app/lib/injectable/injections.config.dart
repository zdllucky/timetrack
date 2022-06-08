// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart' as _i1;
import 'package:hive_flutter/hive_flutter.dart' as _i3;
import 'package:injectable/injectable.dart' as _i2;

import '../app/host/blocs/host/host_cubit.dart' as _i4;
import '../data/remote_host/__.dart' as _i5;
import '../data/remote_host/models/remote_host.dart' as _i7;
import '../data/remote_host/repository.dart' as _i6;
import 'modules/storage.dart' as _i8; // ignore_for_file: unnecessary_lambdas

// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
Future<_i1.GetIt> $initGetIt(_i1.GetIt get,
    {String? environment, _i2.EnvironmentFilter? environmentFilter}) async {
  final gh = _i2.GetItHelper(get, environment, environmentFilter);
  final appStorage = _$AppStorage();
  await gh.singletonAsync<_i3.HiveInterface>(() => appStorage.storage,
      preResolve: true);
  gh.lazySingleton<_i4.HostCubit>(
      () => _i4.HostCubit(get<_i5.RemoteHostRepo>()));
  gh.lazySingleton<_i6.RemoteHostRepo>(
      () => _i6.RemoteHostRepo(get<_i3.Box<_i5.RemoteHost>>()));
  await gh.lazySingletonAsync<_i3.Box<_i7.RemoteHost>>(
      () => appStorage.remoteHostStorage(get<_i3.HiveInterface>()),
      preResolve: true);
  return get;
}

class _$AppStorage extends _i8.AppStorage {}
