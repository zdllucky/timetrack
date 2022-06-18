import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:wrapper_app/app/host/blocs/host_availability/host_availability_cubit.dart';

import '../../../data/remote_host/__.dart';
import '../../../injectable/injections.dart';
import '../__.dart';

class SetHostForm extends StatefulWidget {
  const SetHostForm({Key? key}) : super(key: key);

  @override
  State<SetHostForm> createState() => _SetHostFormState();
}

class _SetHostFormState extends State<SetHostForm> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool disabledOnInput = false;

  _handleSubmit() async {
    if (!(_formKey.currentState?.saveAndValidate() ?? false)) return;

    Uri uri = Uri.parse(_formKey.currentState?.value['host']).replace(path: '');

    get<HostCubit>().updateHost(RemoteHost(uri: uri.toString()));
    get<HostAvailabilityCubit>().checkHost();
  }

  @override
  Widget build(BuildContext c) =>
      BlocConsumer<HostAvailabilityCubit, HostAvailabilityState>(
        listener: (context, state) {
          if (state.error != null) {
            _formKey.currentState?.fields['host']
                ?.invalidate(state.description);
          }
        },
        builder: (context, state) {
          final isFormEnabled = state is! HostChecking &&
              state is! HostLoading &&
              state is! HostAvailable;

          return FormBuilder(
            key: _formKey,
            onChanged: () {
              setState(() =>
                  disabledOnInput = !_formKey.currentState!.saveAndValidate());
            },
            autoFocusOnValidationFailure: true,
            autovalidateMode: AutovalidateMode.disabled,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                mainAxisSize: MainAxisSize.max,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: FormBuilderTextField(
                      initialValue: get<HostCubit>().state.uri,
                      enabled: isFormEnabled,
                      decoration: const InputDecoration(
                          labelText: 'Remote server address',
                          border: OutlineInputBorder()),
                      name: 'host',
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(),
                        FormBuilderValidators.url()
                      ]),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 8, bottom: 16),
                    child: ElevatedButton(
                      style: const ButtonStyle(),
                      onPressed: disabledOnInput || !isFormEnabled
                          ? null
                          : _handleSubmit,
                      child: Text(state.error == null
                          ? state.description
                          : "Reconnect"),
                    ),
                  )
                ],
              ),
            ),
          );
        },
      );
}
