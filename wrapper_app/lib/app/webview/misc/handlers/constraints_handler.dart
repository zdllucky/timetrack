import 'package:wrapper_app/app/safe_constraints/blocs/safe_constraints/safe_constraints_cubit.dart';

import '../../../../injectable/injections.dart';
import 'configure_handlers.dart';

final safeConstraintsHandler = JSHandler(
    handlerName: "set_safe_constraints",
    callbackGenerator: (context, controller) =>
        (args) => {"detail": get<SafeConstraintsCubit>().state?.toJson()});
