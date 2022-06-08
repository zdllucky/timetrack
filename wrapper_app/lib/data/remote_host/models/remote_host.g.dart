// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'remote_host.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class RemoteHostAdapter extends TypeAdapter<RemoteHost> {
  @override
  final int typeId = 1;

  @override
  RemoteHost read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return RemoteHost(
      uri: fields[0] as String,
    );
  }

  @override
  void write(BinaryWriter writer, RemoteHost obj) {
    writer
      ..writeByte(1)
      ..writeByte(0)
      ..write(obj.uri);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is RemoteHostAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
