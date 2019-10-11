import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import validation from '../../../validation';
import InputWrapper from '../../../fields/InputWrapper';

function companyBedarfstraegernummer() {
  const fieldName = 'companyBtnr';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation(),
    label: messages.get('btnr_number'),
    disabled: true
  };
}

export default ConnectToOrderDataFormV2(
  InputWrapper,
  companyBedarfstraegernummer()
);
