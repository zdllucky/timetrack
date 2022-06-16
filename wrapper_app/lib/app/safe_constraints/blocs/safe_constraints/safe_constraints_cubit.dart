import 'package:bloc/bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../../data/safe_constraints/__.dart';
import '../../../../injectable/injections.dart';
import '../../../webview/__.dart';

@lazySingleton
class SafeConstraintsCubit extends Cubit<SafeConstraints?> {
  SafeConstraintsCubit() : super(null);

  @override
  void onChange(Change<SafeConstraints?> change) {
    super.onChange(change);

    final controller = get<WebviewControllerCubit>().state;

    if (controller != null && change.nextState != null) {
      final jsCode = """
        window.dispatchEvent(new CustomEvent("update_safe_constraints", ${{
        "detail": change.nextState!.toJson()
      }.toString()}));
      """;

      get<WebviewControllerCubit>().state!.evaluateJavascript(source: jsCode);
    }
  }

  void updateConstraints(SafeConstraints constraints) {
    if ((state == null) ||
        (state != null &&
            constraints.toJson().toString() != state!.toJson().toString())) {
      emit(constraints);
    }
  }
}
