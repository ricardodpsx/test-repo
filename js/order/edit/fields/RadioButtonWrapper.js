import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadioButton } from '@otr/form-elements';
import RadioField from '../../../../src/UIComponents/RadioField';

const mapStateToProps = ({ order: { toggles } }) => ({
  toggles
});

class RadioButtonWrapper extends Component {
  static propTypes = {
    toggles: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    value: ''
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onChange({ target: { value } });
  }

  render() {
    return this.props.toggles.COMPONENT_LIBRARY_PIONEERING ? (
      <RadioButton
        {...this.props}
        onChange={this.onChange}
        selected={this.props.value}
      />
    ) : (
      <RadioField
        {...this.props}
        onChange={this.onChange}
        selected={this.props.value}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(RadioButtonWrapper);
