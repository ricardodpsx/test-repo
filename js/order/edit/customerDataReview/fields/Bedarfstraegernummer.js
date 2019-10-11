import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../UIComponents/InputField';
import messages from '../../../../messages/messages';
import ConnectToOrderDataForm from '../../ConnectToOrderDataForm';
import validation from '../../validation';

class Bedarfstraegernummer extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  static defaultProps = {
    value: '',
    errorMessage: '',
    onFocusChange: () => {}
  };

  static fieldName = 'btnr';

  static fieldCategory = 'customer';

  static validator = validation();

  render() {
    return (
      <InputField
        id={Bedarfstraegernummer.fieldName}
        label={messages.get('btnr_number')}
        value={this.props.value}
        disabled
      />
    );
  }
}

export default ConnectToOrderDataForm(Bedarfstraegernummer);
