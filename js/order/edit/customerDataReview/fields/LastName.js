import messages from '../../../../messages/messages';
import validation from '../../validation';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function lastName() {
  const fieldName = 'lastName';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    label: messages.get('last_name'),
    placeholder: messages.get('last_name'),
    validator: validation()
      .required()
      .maxLengthForField(50),
    required: true
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, lastName());
