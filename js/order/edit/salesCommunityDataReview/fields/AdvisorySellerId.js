import validation from '../../validation';
import messages from '../../../../messages/messages';
import InputWrapper from '../../fields/InputWrapper';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';

function advisorySellerData() {
  const fieldName = 'advisorySellerId';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'contractualData',
    validator: validation(),
    label: messages.get('advisory_salesperson_id'),
    placeholder: messages.get('seller_id_placeholder')
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, advisorySellerData());
