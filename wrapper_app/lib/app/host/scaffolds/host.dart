import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/remote_host/__.dart';
import '../../../injectable/injections.dart';
import '../__.dart';
import '../blocs/host_availability/host_availability_cubit.dart';
import '../widgets/form.dart';

class HostScaffold extends StatelessWidget {
  final Widget child;

  const HostScaffold({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) => MultiBlocProvider(
        providers: [
          BlocProvider<HostCubit>(create: (_) => get()),
          BlocProvider<HostAvailabilityCubit>(
            create: (_) => get()..checkHost(),
          ),
        ],
        child: BlocBuilder<HostCubit, RemoteHost>(
          builder: (context, host) =>
              BlocBuilder<HostAvailabilityCubit, HostAvailabilityState>(
                  builder: (context, hostAvailabilityState) => Stack(children: [
                        if (hostAvailabilityState is! HostLoaded)
                          const Scaffold(
                            body: SafeArea(
                              child: SetHostForm(),
                            ),
                          ),
                        if (hostAvailabilityState is HostAvailable ||
                            hostAvailabilityState is HostLoaded ||
                            hostAvailabilityState is HostLoading)
                          child,
                      ])),
        ),
      );
}
