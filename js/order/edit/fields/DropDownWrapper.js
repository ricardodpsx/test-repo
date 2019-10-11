import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from '@otr/form-elements';
import styles from './DropDown.css';
import formStyles from '../FormElement.css';
import SelectLegacy from '../../../UIComponents/Select';

const mapStateToProps = ({ order: { toggles } }) => ({
  toggles
});

class DropDownWrapper extends Component {
  static propTypes = {
    toggles: PropTypes.object.isRequired
  };

  render() {
    return this.props.toggles.COMPONENT_LIBRARY_PIONEERING ? (
      <div className={`${formStyles.formElement} ${styles.orderselect}`}>
        <Select {...this.props} />
      </div>
    ) : (
      <SelectLegacy {...this.props} />
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(DropDownWrapper);
