import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

function responsibleSellerNameData() {
  const fieldName = 'responsibleSellerName';

  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'contractualData',
    label: messages.get('responsible_salesperson_name'),
    placeholder: messages.get('seller_name_placeholder'),
    validator: validation().required(),
    required: true
  };
}

export default ConnectToOrderDataFormV2(
  InputWrapper,
  responsibleSellerNameData()
);
