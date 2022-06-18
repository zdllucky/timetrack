import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

import 'host/__.dart';
import 'webview/__.dart';

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
      supportedLocales: const [Locale('en')],
      // theme: ThemeData.dark(),
      home: HostScaffold(child: Webview()),
    );
  }
}
