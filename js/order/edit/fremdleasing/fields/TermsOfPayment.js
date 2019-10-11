import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import validation from '../../validation';
import DropDownWrapper from '../../fields/DropDownWrapper';

const termsOfPaymentInfo = () => {
  const id = 'termsOfPayment';
  const label = messages.get('terms_of_payment');
  const placeholder = 'Wähle eine Option';
  const options = messages.get('termsOfPaymentOptions');

  const validator = validation();
  const fieldName = 'termsOfPayment';
  const fieldCategory = 'contractualData';

  return {
    id,
    label,
    placeholder,
    options,
    fieldName,
    fieldCategory,
    validator
  };
};

export default ConnectToOrderDataFormV2(DropDownWrapper, termsOfPaymentInfo());
