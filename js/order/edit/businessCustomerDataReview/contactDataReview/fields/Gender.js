import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import messages from '../../../../../messages/messages';
import validation from '../../../validation';
import RadioButtonWrapper from '../../../fields/RadioButtonWrapper';

export const genderInfo = () => {
  const id = 'gender';
  const fieldName = 'gender';
  const fieldCategory = 'customer';
  const validator = validation();
  const list = [{ value: 'Herr', id: 'male' }, { value: 'Frau', id: 'female' }];
  const label = messages.get('gender');
  const valueReduxFormatter = value => (value === 'Herr' ? 'male' : 'female');
  const valueDisplayFormatter = value => (value === 'male' ? 'Herr' : 'Frau');

  return {
    id,
    fieldName,
    fieldCategory,
    label,
    validator,
    list,
    valueReduxFormatter,
    valueDisplayFormatter
  };
};

export default ConnectToOrderDataFormV2(RadioButtonWrapper, genderInfo());
