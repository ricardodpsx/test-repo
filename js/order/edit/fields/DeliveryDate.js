import moment from 'moment';
import validation from '../validation';
import messages from '../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import InputWrapper from './InputWrapper';

export const deliveryDateInfo = () => {
  const id = 'deliveryDate';

  const label = messages.get('delivery_date');

  const placeholder = 'MM.JJJJ';

  const fieldName = 'requestedDeliveryDateFrom';

  const fieldCategory = 'contractualData';

  const monthYearFormat = 'MM.YYYY';

  const required = true;

  const isValidISO8601Date = val =>
    moment(val, moment.ISO_8601, true).isValid();

  const isValidMonthYearFormat = val =>
    moment(val, monthYearFormat, true).isValid();

  const fromISO8601ToMonthYearFormat = ISO8601Date =>
    isValidISO8601Date(ISO8601Date)
      ? moment(ISO8601Date).format(monthYearFormat)
      : ISO8601Date;

  const fromMonthYearFormatToISO8601 = monthYearFormattedDate =>
    isValidMonthYearFormat(monthYearFormattedDate)
      ? moment(monthYearFormattedDate, monthYearFormat, true).format(
          'YYYY-MM-DD'
        )
      : monthYearFormattedDate;

  const valueDisplayFormatter = val => fromISO8601ToMonthYearFormat(val || '');

  const validator = validation()
    .required()
    .dateFormat(monthYearFormat)
    .dateNotInThePast('month');

  const valueReduxFormatter = val => {
    return fromMonthYearFormatToISO8601(val);
  };

  return {
    id,
    label,
    placeholder,
    fieldName,
    fieldCategory,
    validator,
    required,
    valueDisplayFormatter,
    valueReduxFormatter
  };
};

export default ConnectToOrderDataFormV2(InputWrapper, deliveryDateInfo());
