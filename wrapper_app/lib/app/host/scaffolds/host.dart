import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/remote_host/__.dart';
import '../__.dart';
import '../widgets/form.dart';

class HostScaffold extends StatelessWidget {
  final Widget child;

  const HostScaffold({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ThemeData.dark().primaryColor,
        body: BlocBuilder<HostCubit, RemoteHost>(
            builder: (_, state) => state.uri.isNotEmpty
                ? child
                : const SafeArea(
                    child: SetHostForm(),
                  )));
  }
}
