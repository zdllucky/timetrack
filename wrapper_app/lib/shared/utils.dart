import "dart:io";

import 'package:flutter/foundation.dart';

class U {
  static Future getLocalTestIPAddress() async {
    return (await NetworkInterface.list())
        .firstWhere((element) => element.name == "en0")
        .addresses[0]
        .address;
  }

  static void dPrint(String message) {
    if (kDebugMode) print('Pop action call received!');
  }
}
