import validation from '../validation';
import messages from '../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import SingleDatePickerWrapper from './SingleDatePickerWrapper';

export const orderDateInfo = () => {
  const id = 'order-date';
  const label = messages.get('order_date');
  const fieldName = 'orderDate';
  const fieldCategory = 'contractualData';
  const required = true;
  const validator = validation()
    .required()
    .dateFormat()
    .dateBetween14DaysInThePastAnd4DaysInTheFuture();

  return {
    id,
    label,
    fieldName,
    fieldCategory,
    required,
    validator
  };
};

export const OrderDate = ConnectToOrderDataFormV2(
  SingleDatePickerWrapper,
  orderDateInfo()
);
