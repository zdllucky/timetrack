import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:wrapper_app/app/safe_constraints/blocs/safe_constraints/safe_constraints_cubit.dart';
import 'package:wrapper_app/data/safe_constraints/__.dart';

class ConstraintsConsumer extends StatelessWidget {
  final Widget child;
  const ConstraintsConsumer({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocListener<SafeConstraintsCubit, SafeConstraints?>(
      listener: (context, state) {

      },
      child: child,
    );
  }
}
