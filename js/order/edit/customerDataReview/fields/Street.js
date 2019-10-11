import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function street() {
  const fieldName = 'street';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation().required(),
    required: true,
    label: messages.get('street'),
    placeholder: messages.get('street')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, street());
