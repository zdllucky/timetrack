import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../injectable/injections.dart';
import '../../safe_constraints/__.dart';
import '../blocs/webview_controller/webview_controller_cubit.dart';

class Webview extends StatelessWidget {
  final GlobalKey webViewKey = GlobalKey();
  final String uri;
  final InAppWebViewGroupOptions options;

  Webview({Key? key, required this.options, required this.uri})
      : super(key: key);

  @override
  Widget build(BuildContext context) => BlocProvider<WebviewControllerCubit>(
        create: (context) => get(),
        child: BlocBuilder<WebviewControllerCubit, InAppWebViewController?>(
          builder: (context, controller) => SafeConstraintsProvider(
            builder: (context, constraints) => InAppWebView(
              key: webViewKey,
              initialUrlRequest: URLRequest(url: Uri.parse(uri)),
              initialOptions: options,
              onWebViewCreated: (controller) => get<WebviewControllerCubit>()
                ..controller = controller
                ..initHandlers(context),
              androidOnPermissionRequest:
                  (controller, origin, resources) async =>
                      PermissionRequestResponse(
                          resources: resources,
                          action: PermissionRequestResponseAction.GRANT),
              shouldOverrideUrlLoading: (controller, navigationAction) async {
                var uri = navigationAction.request.url!;

                if (![
                  "http",
                  "https",
                  "file",
                  "chrome",
                  "data",
                  "javascript",
                  "about"
                ].contains(uri.scheme)) {
                  if (!await launchUrl(uri)) {
                    return NavigationActionPolicy.CANCEL;
                  }
                }
                return NavigationActionPolicy.ALLOW;
              },
              onConsoleMessage: (controller, consoleMessage) =>
                  debugPrint(consoleMessage.toString()),
            ),
          ),
        ),
      );
}
