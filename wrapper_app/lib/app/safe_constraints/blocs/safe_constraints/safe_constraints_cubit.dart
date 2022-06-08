import 'package:bloc/bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../../data/safe_constraints/__.dart';

@lazySingleton
class SafeConstraintsCubit extends Cubit<SafeConstraints?> {
  SafeConstraintsCubit() : super(null);

  // @override
  // void onChange(Change<SafeConstraints?> change) {
  //   super.onChange(change);
  //
  //   debugPrint(change.nextState?.toJson().toString() ?? '');
  // }

  void updateConstraints(SafeConstraints constraints) => emit(constraints);
}
