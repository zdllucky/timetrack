part of 'host_availability_cubit.dart';

@immutable
class HostAvailabilityState {
  final DioError? error;
  final String description;

  const HostAvailabilityState(this.error, this.description);
}

class HostNotLoaded extends HostAvailabilityState {
  const HostNotLoaded() : super(null, 'Connect');
}

class HostLoadError extends HostAvailabilityState {
  HostLoadError(String path, int? code, String? message)
      : super(
            DioError(
                requestOptions: RequestOptions(path: path),
                response: Response(
                    requestOptions: RequestOptions(path: path),
                    statusCode: code,
                    statusMessage: message)),
            'Failed to get resources.');
}

class HostLoading extends HostAvailabilityState {
  const HostLoading() : super(null, 'Connecting...');
}

class HostChecking extends HostAvailabilityState {
  const HostChecking() : super(null, 'Checking connection...');
}

class HostAvailable extends HostAvailabilityState {
  const HostAvailable() : super(null, 'Server is available.');
}

class HostLoaded extends HostAvailable {}

class HostClientError extends HostAvailabilityState {
  const HostClientError(DioError error)
      : super(error, 'Error connecting to server.');
}

class HostCompatibilityError extends HostAvailabilityState {
  const HostCompatibilityError(DioError? error)
      : super(error, 'Server is not suitable.');
}

class HostServerError extends HostAvailabilityState {
  const HostServerError(DioError error) : super(error, "Server error.");
}

class NoInternetConnectionError extends HostAvailabilityState {
  const NoInternetConnectionError(DioError error)
      : super(error, "No internet connection.");
}

class HostConnectionError extends HostAvailabilityState {
  const HostConnectionError(DioError error)
      : super(error, "Can't reach server.");
}

class HostLiveCheckError extends HostAvailabilityState {
  const HostLiveCheckError(DioError error)
      : super(error, "Server is not alive.");
}

class ConnectionCancelledError extends HostAvailabilityState {
  const ConnectionCancelledError(DioError error)
      : super(error, "Connection cancelled.");
}

class UnexpectedError extends HostAvailabilityState {
  const UnexpectedError(DioError error) : super(error, "Unexpected error.");
}

class HostVersionIncompatible extends HostAvailabilityState {
  const HostVersionIncompatible(DioError error)
      : super(error, "Version incompatible, please your app.");
}
