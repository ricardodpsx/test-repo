import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../../UIComponents/Select';
import validation from '../../validation';
import messages from '../../../../messages/messages';
import ConnectToOrderDataForm from '../../ConnectToOrderDataForm';

class CustomerType extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    errorMessage: PropTypes.string,
    onFocusChange: PropTypes.func
  };

  static defaultProps = {
    value: 'private',
    errorMessage: '',
    onFocusChange: () => {}
  };

  static options = [
    { value: 'private', label: 'Privatkunde' },
    { value: 'company', label: 'Firmenkunde' }
  ];

  static fieldName = 'customerType';

  static fieldCategory = 'customer';

  static validator = validation()
    .required()
    .equal(
      'private',
      messages.get('validation_error_business_customer_not_supported_yet')
    );

  onChangeHandler = ({ target: { value } }) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <Select
        id={CustomerType.fieldName}
        label={messages.get('customer_type')}
        options={CustomerType.options}
        value={this.props.value}
        errorMessage={this.props.errorMessage}
        onChange={this.onChangeHandler}
        onFocusChange={this.props.onFocusChange}
        required
      />
    );
  }
}

export default ConnectToOrderDataForm(CustomerType);
