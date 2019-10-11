import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function city() {
  const fieldName = 'city';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation().required(),
    required: true,
    label: messages.get('city'),
    placeholder: messages.get('city')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, city());
