import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function postalCode() {
  const fieldName = 'postalCode';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation().required(),
    required: true,
    label: messages.get('postal_code'),
    placeholder: messages.get('postal_code')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, postalCode());
