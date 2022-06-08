import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:wrapper_app/shared/Utils.dart';

import '../data/remote_host/models/remote_host.dart';
import '../injectable/injections.dart';
import 'host/__.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        FormBuilderLocalizations.delegate
      ],
      supportedLocales: const [Locale('en'), Locale('ru')],
      theme: ThemeData.dark(),
      home: BlocProvider<HostCubit>(
          create: (_) => get<HostCubit>(), child: const MyHomePage()),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _controller = TextEditingController();
  final GlobalKey webViewKey = GlobalKey();
  InAppWebViewController? webViewController;
  InAppWebViewGroupOptions options = InAppWebViewGroupOptions(
      crossPlatform: InAppWebViewOptions(
        useShouldOverrideUrlLoading: true,
        mediaPlaybackRequiresUserGesture: false,
      ),
      android: AndroidInAppWebViewOptions(
        useHybridComposition: true,
      ),
      ios: IOSInAppWebViewOptions(
        allowsInlineMediaPlayback: true,
      ));
  late PullToRefreshController pullToRefreshController;

  @override
  initState() {
    super.initState();

    pullToRefreshController = PullToRefreshController(
      options: PullToRefreshOptions(
        color: Colors.blue,
      ),
      onRefresh: () async {
        if (Platform.isAndroid) {
          webViewController?.reload();
        } else if (Platform.isIOS) {
          webViewController?.loadUrl(
              urlRequest: URLRequest(url: await webViewController?.getUrl()));
        }
      },
    );

    Utils.getLocalTestIPAddr().then((value) => _controller.text = value);
  }

  // _updateConstraints(
  //     double h, double w, double l, double t, double r, double b) async {
  //   setState(() {
  //     _safePaddingTop = t;
  //     _safePaddingLeft = l;
  //     _safePaddingRight = r;
  //     _safePaddingBottom = b;
  //     _safeHeight = h - t - b;
  //     _safeWidth = w - l - r;
  //   });
  // }

  @override
  Widget build(BuildContext context) {
    // _updateConstraints(
    //   MediaQuery.of(context).size.height,
    //   MediaQuery.of(context).size.width,
    //   MediaQuery.of(context).padding.left,
    //   MediaQuery.of(context).padding.top,
    //   MediaQuery.of(context).padding.right,
    //   MediaQuery.of(context).padding.bottom,
    // );

    return Scaffold(
        backgroundColor: ThemeData.dark().primaryColor,
        body: HostScaffold(
          child: BlocBuilder<HostCubit, RemoteHost>(
            builder: (context, state) {
              return InAppWebView(
                key: webViewKey,
                initialUrlRequest: URLRequest(url: Uri.parse(state.uri)),
                initialOptions: options,
                pullToRefreshController: pullToRefreshController,
                onWebViewCreated: (controller) {
                  webViewController = controller;
                },
                androidOnPermissionRequest:
                    (controller, origin, resources) async {
                  return PermissionRequestResponse(
                      resources: resources,
                      action: PermissionRequestResponseAction.GRANT);
                },
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
                onLoadError: (controller, url, code, message) {
                  pullToRefreshController.endRefreshing();
                },
                onConsoleMessage: (controller, consoleMessage) {
                  print(consoleMessage);
                },
              );
            },
          ),
        ) // This trailing comma makes auto-formatting nicer for build methods.
        );
  }
}
