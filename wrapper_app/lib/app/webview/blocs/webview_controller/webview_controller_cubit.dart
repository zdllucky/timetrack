import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:injectable/injectable.dart';

import '../../misc/handlers/__.dart';

@lazySingleton
class WebviewControllerCubit extends Cubit<InAppWebViewController?> {
  WebviewControllerCubit() : super(null);

  set controller(InAppWebViewController? controller) => emit(controller);

  void initHandlers(BuildContext context) {
    if (state != null) {
      HandlersConfigurator([safeConstraintsHandler]).init(context, state!);
    }
  }
}
