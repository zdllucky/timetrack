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
      get<WebviewControllerCubit>().sendEvent(
          name: 'update_safe_constraints', payload: change.nextState!.toJson());
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
