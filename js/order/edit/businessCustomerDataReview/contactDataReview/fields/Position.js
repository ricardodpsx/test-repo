import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import PositionOptions from './PositionOptions';
import validation from '../../../validation';
import DropDownWrapper from '../../../fields/DropDownWrapper';

export const positionInfo = () => {
  const id = 'position';
  const label = messages.get('position');
  const placeholder = 'Wähle eine Option';
  const fieldName = 'position';
  const fieldCategory = 'customer';
  const validator = validation().required();
  const options = PositionOptions;
  const required = true;

  return {
    id,
    label,
    placeholder,
    options,
    fieldName,
    fieldCategory,
    validator,
    required
  };
};

export default ConnectToOrderDataFormV2(DropDownWrapper, positionInfo());
