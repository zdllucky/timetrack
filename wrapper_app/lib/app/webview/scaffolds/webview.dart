import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:wrapper_app/app/host/blocs/host_availability/host_availability_cubit.dart';
import 'package:wrapper_app/data/remote_host/__.dart';

import '../../../injectable/injections.dart';
import '../../host/__.dart';
import '../../safe_constraints/__.dart';
import '../__.dart';
import '../misc/should_override_loading_fn.dart';

class Webview extends StatelessWidget {
  final GlobalKey webViewKey = GlobalKey();

  Webview({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocProvider<WebviewControllerCubit>(
        create: (context) => get(),
        child: BlocBuilder<HostCubit, RemoteHost>(
          builder: (context, host) =>
              BlocBuilder<HostAvailabilityCubit, HostAvailabilityState>(
            builder: (context, hostAvailabilityState) =>
                BlocBuilder<WebviewControllerCubit, InAppWebViewController?>(
              builder: (context, controller) => SafeConstraintsProvider(
                builder: (context, constraints) => Scaffold(
                  body: InAppWebView(
                    key: webViewKey,
                    initialUrlRequest: URLRequest(
                        url: Uri.parse(host.uri).replace(port: 3001)),
                    initialOptions: webViewOptions,
                    onWebViewCreated: (controller) {
                      get<HostAvailabilityCubit>().hostLoading();
                      get<WebviewControllerCubit>()
                        ..controller = controller
                        ..initHandlers(context);
                    },
                    onLoadStop: (_, __) =>
                        get<HostAvailabilityCubit>().hostLoaded(),
                    onLoadError: (_, path, code, message) =>
                        get<HostAvailabilityCubit>()
                            .hostLoadError(path.toString(), code, message),
                    androidOnPermissionRequest:
                        (controller, origin, resources) async =>
                            PermissionRequestResponse(
                                resources: resources,
                                action: PermissionRequestResponseAction.GRANT),
                    shouldOverrideUrlLoading: shouldOverrideUrlLoading,
                    onConsoleMessage: (controller, consoleMessage) =>
                        debugPrint(consoleMessage.toString()),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
}
