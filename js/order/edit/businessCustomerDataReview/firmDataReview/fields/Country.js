import messages from '../../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../../ConnectToOrderDataForm';
import CountryOptions from './CountryOptions';
import validation from '../../../validation';
import DropDownWrapper from '../../../fields/DropDownWrapper';

export const countryInfo = () => {
  const options = CountryOptions;
  const id = 'country';
  const label = messages.get('country');
  const placeholder = 'Wähle eine Option';
  const fieldName = 'country';
  const fieldCategory = 'customer';
  const validator = validation().required();
  const required = true;

  return {
    id,
    label,
    placeholder,
    options,
    fieldName,
    fieldCategory,
    validator,
    required
  };
};

export default ConnectToOrderDataFormV2(DropDownWrapper, countryInfo());
