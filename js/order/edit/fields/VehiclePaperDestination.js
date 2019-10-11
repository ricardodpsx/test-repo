import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import InputWrapper from './InputWrapper';
import validation from '../validation';
import messages from '../../../messages/messages';

function vehiclePaperDestinationdata() {
  const fieldName = 'vehiclePaperDestination';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'contractualData',
    label: messages.get('vehicle_paper_destination'),
    placeholder: messages.get('default_placeholder'),
    valueReduxFormatter: value => value.substring(0, 7),
    validator: validation()
  };
}

export default ConnectToOrderDataFormV2(
  InputWrapper,
  vehiclePaperDestinationdata()
);
