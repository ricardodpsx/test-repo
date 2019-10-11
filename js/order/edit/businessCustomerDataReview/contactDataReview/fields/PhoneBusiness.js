import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import InputWrapper from '../../../fields/InputWrapper';
import validation from '../../../validation';

function phoneBusiness() {
  const fieldName = 'phoneBusiness';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    label: messages.get('phone_business'),
    placeholder: messages.get(''),
    validator: validation()
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, phoneBusiness());
