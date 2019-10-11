import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import InputWrapper from './InputWrapper';
import validation from '../validation';
import { fromISO8601ToDisplayFormat } from '../../../UIComponents/datePickers/datePickerUtils';
import messages from '../../../messages/messages';

export const frozenOrderDateInfo = () => {
  const id = 'order-date';
  const label = messages.get('order_date');
  const fieldName = 'orderDate';
  const fieldCategory = 'contractualData';
  const required = true;
  const disabled = true;
  const validator = validation().required();
  const valueDisplayFormatter = val => fromISO8601ToDisplayFormat(val || '');

  return {
    id,
    label,
    fieldName,
    fieldCategory,
    required,
    validator,
    disabled,
    valueDisplayFormatter
  };
};

export default ConnectToOrderDataFormV2(InputWrapper, frozenOrderDateInfo());
