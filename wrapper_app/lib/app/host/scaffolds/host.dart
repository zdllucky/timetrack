import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/remote_host/__.dart';
import '../../../injectable/injections.dart';
import '../__.dart';
import '../widgets/form.dart';

class HostScaffold extends StatelessWidget {
  final Widget Function(BuildContext, RemoteHost) builder;

  const HostScaffold({Key? key, required this.builder}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<HostCubit>(
        create: (_) => get<HostCubit>(),
        child: Scaffold(
            backgroundColor: ThemeData.dark().primaryColor,
            body: BlocBuilder<HostCubit, RemoteHost>(
                builder: (context, state) => state.uri.isNotEmpty
                    ? builder(context, state)
                    : const SafeArea(
                        child: SetHostForm(),
                      ))));
  }
}
