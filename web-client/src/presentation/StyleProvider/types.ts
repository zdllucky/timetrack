export type FlutterWindow = Window &
  typeof globalThis & { flutter_inappwebview: any };

export const flutterCall = (action: (flutter_inappwebview: any) => any) =>
  (window as FlutterWindow).flutter_inappwebview &&
  action((window as FlutterWindow).flutter_inappwebview);
