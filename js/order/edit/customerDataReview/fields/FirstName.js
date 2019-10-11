import messages from '../../../../messages/messages';
import validation from '../../validation';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function firstNameData() {
  const fieldName = 'firstName';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    label: messages.get('first_name'),
    placeholder: messages.get('first_name'),
    validator: validation()
      .required()
      .maxLengthForField(30),
    required: true
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, firstNameData());
