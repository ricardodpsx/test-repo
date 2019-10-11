import messages from '../../../../messages/messages';
import { ConnectToOrderDataFormV2 } from '../../ConnectToOrderDataForm';
import validation from '../../validation';
import DropDownWrapper from '../../fields/DropDownWrapper';

const leasingRequestInfo = () => {
  const id = 'leasingRequest';
  const label = messages.get('leasing_request');
  const placeholder = 'Wähle eine Option';
  const options = messages.get('leasingRequestOptions');

  const validator = validation();
  const fieldName = 'leasingRequest';
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

export default ConnectToOrderDataFormV2(DropDownWrapper, leasingRequestInfo());
