import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function advisorySellerNameData() {
  const fieldName = 'advisorySellerName';

  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'contractualData',
    validator: validation(),
    label: messages.get('advisory_salesperson_name'),
    placeholder: messages.get('seller_name_placeholder')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, advisorySellerNameData());
