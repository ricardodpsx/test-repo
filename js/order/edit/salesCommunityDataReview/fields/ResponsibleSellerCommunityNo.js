import validation from '../../validation';
import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import InputWrapper from '../../fields/InputWrapper';

export const responsibleSellerCommunityNumber = () => {
  const fieldName = 'responsibleSellerCommunityNo';
  return {
    id: fieldName,
    fieldName,
    label: messages.get('responsible_salesperson_community_no'),
    validator: validation(),
    fieldCategory: 'contractualData',
    placeholder: messages.get('seller_community_no_placeholder')
  };
};

export default ConnectToOrderDataFormV2(
  InputWrapper,
  responsibleSellerCommunityNumber()
);
