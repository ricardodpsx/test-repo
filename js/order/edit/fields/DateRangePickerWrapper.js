import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateRangePicker } from '@otr/date-picker';
import CustomDateRangePicker from '../../../UIComponents/datePickers/CustomDateRangePicker';
import styles from '../FormElement.css';

const mapStateToProps = ({ order: { toggles } }) => ({
  toggles
});

class DateRangePickerWrapper extends Component {
  static propTypes = {
    toggles: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object
  };

  static defaultProps = {
    value: { startDate: null, endDate: null }
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
      <div className={`${styles.formElement} ${styles.DateRangePicker}`}>
        <DateRangePicker
          {...this.props}
          onDatesChange={this.onChange}
          startDate={this.props.value.startDate}
          endDate={this.props.value.endDate}
        />
      </div>
    ) : (
      <CustomDateRangePicker
        {...this.props}
        onDatesChange={this.onChange}
        startDate={this.props.value.startDate}
        endDate={this.props.value.endDate}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(DateRangePickerWrapper);
