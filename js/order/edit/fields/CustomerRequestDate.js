import messages from '../../../messages/messages';
import validation from '../validation';
import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import DateRangePickerWrapper from './DateRangePickerWrapper';

export const customRequestDateInfo = () => {
  const id = 'customer-request-date';
  const label = messages.get('customer_request_date');
  const required = true;

  const fieldName = 'customerRequestDate';

  const fieldCategory = 'contractualData';

  const validator = validation().requiredDateRange();

  return {
    id,
    label,
    fieldName,
    fieldCategory,
    validator,
    required
  };
};

export default ConnectToOrderDataFormV2(
  DateRangePickerWrapper,
  customRequestDateInfo()
);
