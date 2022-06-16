import 'package:flutter/cupertino.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class JSHandler {
  final String handlerName;
  final dynamic Function(List) Function(
          BuildContext context, InAppWebViewController controller)
      callbackGenerator;

  JSHandler({required this.handlerName, required this.callbackGenerator});
}

class HandlersConfigurator {
  final List<JSHandler> _handlers;

  HandlersConfigurator(this._handlers);

  void init(BuildContext context, InAppWebViewController controller) {
    for (var handler in _handlers) {
      controller.addJavaScriptHandler(
          handlerName: handler.handlerName,
          callback: handler.callbackGenerator(context, controller));
    }
  }
}
