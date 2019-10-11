import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import validation from '../../../validation';
import InputWrapper from '../../../fields/InputWrapper';

function firmName() {
  const fieldName = 'company';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation()
      .required()
      .maxLengthForField(50),
    required: true,
    label: messages.get('company'),
    placeholder: messages.get('company_placeholder')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, firmName());
