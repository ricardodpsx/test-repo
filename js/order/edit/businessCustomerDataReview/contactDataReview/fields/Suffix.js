import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import InputWrapper from '../../../fields/InputWrapper';
import validation from '../../../validation';

function suffix() {
  const fieldName = 'suffix';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    label: messages.get('suffix'),
    placeholder: messages.get('default_placeholder'),
    validator: validation()
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, suffix());
