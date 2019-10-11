import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import validation from '../../../validation';
import InputWrapper from '../../../fields/InputWrapper';

const changeValueToValidFormat = value => {
  return value && value.length === 10 && value.startsWith('00')
    ? value.substring(2, 10)
    : value;
};

function accountNumber() {
  const fieldName = 'accountNumber';
  return {
    id: fieldName,
    fieldName,
    fieldCategory: 'customer',
    valueDisplayFormatter: changeValueToValidFormat,
    validator: validation().validateLengthForAccountNumber(),
    label: messages.get('account_number'),
    disabled: true
  };
}

export default ConnectToOrderDataFormV2(InputWrapper, accountNumber());
