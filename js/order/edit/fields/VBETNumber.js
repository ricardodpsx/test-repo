import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import InputWrapper from './InputWrapper';
import validation from '../validation';
import messages from '../../../messages/messages';

function vbetNumberData() {
  const fieldName = 'vbetNumber';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'contractualData',
    label: messages.get('vbet_number'),
    placeholder: 'In Dispo erfragen',
    validator: validation().required(),
    valueReduxFormatter: value => value.substring(0, 8),
    required: true
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, vbetNumberData());
