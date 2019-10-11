import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SingleDatePicker } from '@otr/date-picker';
import DatePicker from '../../../UIComponents/datePickers/DatePicker';
import styles from '../FormElement.css';

const mapStateToProps = ({ order: { toggles } }) => ({
  toggles
});

class SingleDatePickerWrapper extends Component {
  static propTypes = {
    toggles: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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
      <div id={this.props.id} className={styles.formElement}>
        <SingleDatePicker
          {...this.props}
          onDateChange={this.onChange}
          date={this.props.value}
        />
      </div>
    ) : (
      <DatePicker
        {...this.props}
        onDateChange={this.onChange}
        date={this.props.value}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(SingleDatePickerWrapper);
