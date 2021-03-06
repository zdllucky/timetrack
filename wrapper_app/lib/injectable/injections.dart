import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

import 'injections.config.dart';

const dev = Environment('dev');

final get = GetIt.instance;

@InjectableInit()
Future<GetIt> configureDependencies() => $initGetIt(get);
