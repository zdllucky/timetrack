import "dart:io";

class Utils {
  static Future getLocalTestIPAddress() async {
    return (await NetworkInterface.list())
        .firstWhere((element) => element.name == "en0")
        .addresses[0]
        .address;
  }
}
