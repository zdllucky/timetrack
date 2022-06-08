import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:wrapper_app/app/app.dart';

import 'app/app.dart';
import 'injectable/injections.dart';

void main() async {
  await configureDependencies();

  if (Platform.isAndroid) {
    await AndroidInAppWebViewController.setWebContentsDebuggingEnabled(true);
  }

  runApp(const App());
}
