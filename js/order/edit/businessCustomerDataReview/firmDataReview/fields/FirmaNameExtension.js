import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import validation from '../../../validation';
import InputWrapper from '../../../fields/InputWrapper';

function firmNameExtension() {
  const fieldName = 'companyNameExtension';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation(),
    label: messages.get('company_name_extension'),
    placeholder: messages.get('company_name_extension_placeholder')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, firmNameExtension());
