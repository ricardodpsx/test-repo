import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckboxField.css';
import messages from '../../../messages/messages';

class CheckboxField extends Component {
  renderLabel() {
    if (this.props.isHeader) {
      return messages.get('headerOptions')[this.props.value];
    }
    return messages
      .get('printingOptions')(this.props.isChangeOrder)
      .get(this.props.value);
  }

  render() {
    return (
      <div
        className={
          this.props.isHeader ? styles.radiobuttonField : styles.checkboxField
        }
      >
        <label
          className={this.props.disabled ? styles.disabled : styles.enabled}
        >
          <input
            checked={this.props.checked}
            type="checkbox"
            value={this.props.value}
            onChange={e =>
              this.props.onChange(
                this.props.value,
                e.target.checked,
                this.props.customerType
              )
            }
            disabled={this.props.disabled}
          />
          <span className={styles.checkmark}>&nbsp;</span>
          {this.renderLabel()}
        </label>
      </div>
    );
  }
}

CheckboxField.propTypes = {
  value: PropTypes.string.isRequired,
  customerType: PropTypes.string.isRequired,
  isChangeOrder: PropTypes.bool.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isHeader: PropTypes.bool
};

CheckboxField.defaultProps = {
  checked: true,
  disabled: false,
  isHeader: false,
  onChange: () => {}
};

export default CheckboxField;
