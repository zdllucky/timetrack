import 'package:json_annotation/json_annotation.dart';

part 'safe_constraints.g.dart';

@JsonSerializable()
class SafeConstraints {
  final double offsetLeft, offsetTop, offsetBottom, offsetRight, width, height;

  SafeConstraints(
      {required this.offsetTop,
      required this.offsetLeft,
      required this.offsetRight,
      required this.width,
      required this.height,
      required this.offsetBottom});

  factory SafeConstraints.fromJson(Map<String, dynamic> json) =>
      _$SafeConstraintsFromJson(json);

  Map<String, dynamic> toJson() => _$SafeConstraintsToJson(this);
}
