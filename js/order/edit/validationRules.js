import moment from 'moment';
import messages from '../../messages/messages';

const DATE_FORMAT_VALIDATION_ERROR = {
  [moment.ISO_8601]: messages.get('validation_error_date_format_default'),
  'MM.YYYY': messages.get('validation_error_date_format_mm.yyyy'),
  'DD.MM.YYYY': messages.get('validation_error_date_format_default')
};

export function required() {
  return {
    test: value => !!(value && value.length > 0),
    error: messages.get('validation_error_required')
  };
}

export function requiredDateRange() {
  return {
    test: value =>
      !!(
        value &&
        value.startDate &&
        value.startDate.length > 0 &&
        value.endDate &&
        value.endDate.length > 0
      ),
    error: messages.get('validation_error_required')
  };
}

export function equal(expectedValue, errorMessage) {
  return {
    test: value => value === expectedValue,
    error: errorMessage
  };
}

export function dateFormat(format = moment.ISO_8601) {
  return {
    test: value => moment(value, moment.ISO_8601, true).isValid(),
    error: DATE_FORMAT_VALIDATION_ERROR[format]
  };
}

export function dateFormatCheckForDefaultFormat(format = 'DD.MM.YYYY') {
  return {
    test: value => moment(value, format, true).isValid(),
    error: DATE_FORMAT_VALIDATION_ERROR[format]
  };
}

export function dateNotInThePast(granularity = 'day') {
  return {
    test: value => moment(value).isSameOrAfter(moment(), granularity),
    error: messages.get('validation_error_date_not_in_the_past')
  };
}

export function dateBetween14DaysInThePastAnd4DaysInTheFuture() {
  return {
    test: value =>
      moment(value).isBetween(
        moment().add(-15, 'days'),
        moment().add(4, 'days')
      ),
    error: messages.get('validation_error_order_date_range')
  };
}

export function maxLengthForField(maxlength) {
  return {
    test: value => !!(value && value.length <= maxlength),
    error: messages.get('max_length_validation_error')(maxlength)
  };
}

export function validateLengthForAccountNumber() {
  return {
    test: value =>
      !!(
        !value ||
        value.length === 8 ||
        (value.length === 10 && value.startsWith('00'))
      ),
    error: messages.get('max_length_validation_error')(8)
  };
}

export default {
  required,
  equal,
  dateFormat,
  requiredDateRange,
  dateNotInThePast,
  dateBetween14DaysInThePastAnd4DaysInTheFuture,
  maxLengthForField,
  validateLengthForAccountNumber
};
