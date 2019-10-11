import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function houseNumber() {
  const fieldName = 'houseNumber';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation().required(),
    required: true,
    label: messages.get('house_number'),
    placeholder: messages.get('house_number')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, houseNumber());
