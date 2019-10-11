import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Textarea } from '@otr/form-elements';
import TextArea from '../../../UIComponents/TextArea';
import styles from './SondervereinbarungenSection.css';

const mapStateToProps = ({ order: { toggles } }) => ({
  toggles
});

class TextAreaWrapper extends Component {
  static propTypes = {
    toggles: PropTypes.object.isRequired
  };

  render() {
    return this.props.toggles.COMPONENT_LIBRARY_PIONEERING ? (
      <Textarea {...this.props} />
    ) : (
      <div
        className={[styles.textAreaContainer, styles.sizeAdjusted].join(' ')}
      >
        <TextArea {...this.props} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(TextAreaWrapper);
