import 'package:hive_flutter/hive_flutter.dart';

part 'remote_host.g.dart';

@HiveType(typeId: 1)
class RemoteHost {
  @HiveField(0)
  final String uri;

  RemoteHost({this.uri = ''});
}
