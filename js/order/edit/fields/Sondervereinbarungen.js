import messages from '../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../ConnectToOrderDataForm';
import validation from '../validation';
import TextAreaWrapper from './TextAreaWrapper';

const sondervereinbarungInfo = () => {
  const id = 'sondervereinbarungen';
  const placeholder = messages.get('sondervereinbarungen_placeholder_text');
  const fieldName = 'sondervereinbarungen';
  const fieldCategory = 'contractualData';
  const validator = validation();
  const maxLength = 5000;
  const valueReduxFormatter = val => val.substring(0, maxLength);
  return {
    id,
    placeholder,
    fieldName,
    fieldCategory,
    validator,
    maxLength,
    valueReduxFormatter
  };
};

export default ConnectToOrderDataFormV2(
  TextAreaWrapper,
  sondervereinbarungInfo()
);
