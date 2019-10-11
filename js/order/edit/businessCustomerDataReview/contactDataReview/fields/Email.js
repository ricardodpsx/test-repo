import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import InputWrapper from '../../../fields/InputWrapper';
import validation from '../../../validation';

function emailFieldData() {
  const fieldName = 'email';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    label: messages.get('email'),
    placeholder: messages.get('email_placeholder'),
    validator: validation()
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, emailFieldData());
