import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
final InAppWebViewGroupOptions webViewOptions = InAppWebViewGroupOptions(
    crossPlatform: InAppWebViewOptions(
      useShouldOverrideUrlLoading: true,
      mediaPlaybackRequiresUserGesture: false,
    ),
    android: AndroidInAppWebViewOptions(
      useHybridComposition: true,
    ),
    ios: IOSInAppWebViewOptions(
      allowsInlineMediaPlayback: true,
      allowsLinkPreview: false,
      allowsBackForwardNavigationGestures: false,
      alwaysBounceHorizontal: false,
      alwaysBounceVertical: false,
      isFraudulentWebsiteWarningEnabled: false,
    ));
