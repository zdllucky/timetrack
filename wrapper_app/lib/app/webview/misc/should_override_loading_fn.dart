import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:url_launcher/url_launcher.dart';

Future<NavigationActionPolicy?> shouldOverrideUrlLoading(
    InAppWebViewController controller,
    NavigationAction navigationAction) async {
  var uri = navigationAction.request.url!;

  if (!["http", "https", "file", "chrome", "data", "javascript", "about"]
      .contains(uri.scheme)) {
    if (!await launchUrl(uri)) {
      return NavigationActionPolicy.CANCEL;
    }
  }
  return NavigationActionPolicy.ALLOW;
}
