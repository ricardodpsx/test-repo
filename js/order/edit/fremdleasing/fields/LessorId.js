import InputWrapper from '../../fields/InputWrapper';
import messages from '../../../../messages/messages';
import validation from '../../validation';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';

function lessorIdData() {
  const fieldName = 'lessorId';
  return {
    id: fieldName,
    fieldName,
    label: messages.get('lessor_id'),
    placeholder: messages.get('lessor_id_placeholder'),
    fieldCategory: 'contractualData',
    validator: validation()
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, lessorIdData());
