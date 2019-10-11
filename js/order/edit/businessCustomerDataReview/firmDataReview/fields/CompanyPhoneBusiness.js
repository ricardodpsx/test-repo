import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import validation from '../../../validation';
import InputWrapper from '../../../fields/InputWrapper';

function companyPhoneBusiness() {
  const fieldName = 'companyPhoneBusiness';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation(),
    label: messages.get('phone_business')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, companyPhoneBusiness());
