import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import validation from '../../../validation';
import InputWrapper from '../../../fields/InputWrapper';

function vatNumber() {
  const fieldName = 'vatNumber';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    validator: validation(),
    label: messages.get('vat_number'),
    disabled: true
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, vatNumber());
