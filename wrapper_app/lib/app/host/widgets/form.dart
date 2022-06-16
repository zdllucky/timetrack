import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

import '../../../data/remote_host/__.dart';
import '../__.dart';

class SetHostForm extends StatefulWidget {
  const SetHostForm({Key? key}) : super(key: key);

  @override
  State<SetHostForm> createState() => _SetHostFormState();
}

class _SetHostFormState extends State<SetHostForm> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool disabledOnRequest = false;
  bool disabledOnInput = false;

  _handleSubmit() async {
    setState(() => disabledOnRequest = true);
    try {
      if (!(_formKey.currentState?.saveAndValidate() ?? false)) return;
      final Uri uri = Uri.parse(_formKey.currentState?.value['host'])
          .replace(port: 4000, path: 'health', query: null);

      Response res = await Dio().get(uri.toString());

      if (res.data['status'] == 'Ok!' && mounted) {
        context.read<HostCubit>().updateHost(RemoteHost(
              uri: uri.replace(port: 3001, path: '').toString(),
            ));
      } else {
        throw DioError(
            requestOptions: res.requestOptions,
            type: DioErrorType.response,
            error: 'Server is not alive or not suitable');
      }
    } on DioError catch (e) {
      setState(() => disabledOnInput = true);
      _formKey.currentState?.fields['host']?.invalidate(e.message);
    }
    setState(() => disabledOnRequest = false);
  }

  @override
  Widget build(BuildContext c) => FormBuilder(
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
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: FormBuilderTextField(
                  enabled: !disabledOnRequest,
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
                  onPressed: disabledOnRequest || disabledOnInput
                      ? null
                      : _handleSubmit,
                  child: const Text('Proceed'),
                ),
              )
            ],
          ),
        ),
      );
}
