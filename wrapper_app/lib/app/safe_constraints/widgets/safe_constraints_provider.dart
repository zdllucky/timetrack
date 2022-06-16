import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/safe_constraints/models/safe_constraints.dart';
import '../../../injectable/injections.dart';
import '../__.dart';

class SafeConstraintsProvider extends StatelessWidget {
  final Widget Function(BuildContext constext, SafeConstraints? state) builder;

  const SafeConstraintsProvider({Key? key, required this.builder})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<SafeConstraintsCubit>(
      create: (context) => get<SafeConstraintsCubit>(),
      child: BlocBuilder<SafeConstraintsCubit, SafeConstraints?>(
          builder: (context, state) {
        get<SafeConstraintsCubit>().updateConstraints(SafeConstraints(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          offsetLeft: MediaQuery.of(context).padding.left,
          offsetTop: MediaQuery.of(context).padding.top,
          offsetRight: MediaQuery.of(context).padding.right,
          offsetBottom: MediaQuery.of(context).padding.bottom,
        ));

        return builder(context, state);
      }),
    );
  }
}
