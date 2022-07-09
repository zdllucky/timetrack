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
      theme: ThemeData().copyWith(
          backgroundColor: Colors.white,
          scaffoldBackgroundColor: Colors.white,
          appBarTheme: const AppBarTheme().copyWith(
              backgroundColor: Colors.white,
              centerTitle: false,
              elevation: 1,
              titleTextStyle: TextStyle(
                  letterSpacing: -.15,
                  fontSize: 20,
                  color: ThemeData().textTheme.bodyText1?.color,
                  fontWeight: FontWeight.w600)),
          elevatedButtonTheme: ElevatedButtonThemeData(
              style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.blue.shade700),
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.white)))),
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
