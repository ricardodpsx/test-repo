import messages from '../../../messages/messages';
import validation from '../validation';
import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import DateRangePickerWrapper from './DateRangePickerWrapper';

export const agreedDeliveryDateInfo = () => {
  const id = 'agreed-delivery-date';
  const label = messages.get('agreed_delivery_date');
  const fieldName = 'agreedDeliveryDate';
  const fieldCategory = 'contractualData';
  const required = true;

  const validator = validation().requiredDateRange();

  return {
    id,
    label,
    fieldName,
    fieldCategory,
    required,
    validator
  };
};

export default ConnectToOrderDataFormV2(
  DateRangePickerWrapper,
  agreedDeliveryDateInfo()
);
