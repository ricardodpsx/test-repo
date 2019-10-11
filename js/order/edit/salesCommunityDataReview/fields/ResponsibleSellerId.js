import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function responsibleSellerIdData() {
  const fieldName = 'responsibleSellerId';

  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'contractualData',
    label: messages.get('responsible_salesperson_id'),
    placeholder: messages.get('seller_id_placeholder'),
    validator: validation().required(),
    required: true
  };
}

export default ConnectToOrderDataFormV2(
  InputWrapper,
  responsibleSellerIdData()
);
