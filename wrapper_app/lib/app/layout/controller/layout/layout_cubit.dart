import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart';

part 'layout_state.dart';

class LayoutCubit extends Cubit<LayoutState> {
  LayoutCubit() : super(LayoutInitial());
}
