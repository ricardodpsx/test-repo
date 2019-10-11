import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from '@otr/form-elements';
import InputField from '../../../UIComponents/InputField';
import styles from '../FormElement.css';

const mapStateToProps = ({ order: { toggles } }) => ({
  toggles
});

class InputWrapper extends Component {
  static propTypes = {
    toggles: PropTypes.object.isRequired
  };

  render() {
    return this.props.toggles.COMPONENT_LIBRARY_PIONEERING ? (
      <div className={styles.formElement}>
        <Input {...this.props} />
      </div>
    ) : (
      <InputField {...this.props} />
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(InputWrapper);
