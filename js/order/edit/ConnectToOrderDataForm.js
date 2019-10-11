import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {
  changeOrderDataFormValue,
  resetOrderDataFormError,
  validateOrderDataForm
} from '../../actionCreators';
import { isEmptyString } from '../../utils/stringUtil';

const renderedFormFields = [];

const mapDispatchToProps = dispatch => ({
  onChangeHandler: (fieldName, fieldCategory) => fieldValue => {
    dispatch(changeOrderDataFormValue(fieldName, fieldValue, fieldCategory));
  },

  onFocusChangeHandler: fieldName => ({ focused }) =>
    focused
      ? dispatch(resetOrderDataFormError(fieldName))
      : dispatch(validateOrderDataForm(fieldName))
});

const mapStateToProps = ({ order: { form } }) => ({
  data: form.data,
  errors: form.errors
});

const ConnectToOrderDataForm = FieldComponent => {
  const { fieldName, fieldCategory } = FieldComponent;

  const fieldComponentDisplayName =
    FieldComponent.displayName || FieldComponent.name || 'Component';

  class ConnectedComponent extends Component {
    static propTypes = {
      data: PropTypes.shape({
        contractualData: PropTypes.object.isRequired,
        customer: PropTypes.object.isRequired
      }).isRequired,
      errors: PropTypes.object.isRequired,
      onChangeHandler: PropTypes.func.isRequired,
      onFocusChangeHandler: PropTypes.func.isRequired
    };

    static displayName = `ConnectToOrderDataForm(${fieldComponentDisplayName})`;

    componentDidMount() {
      renderedFormFields.push(FieldComponent);
    }

    componentWillUnmount() {
      renderedFormFields.splice(renderedFormFields.indexOf(FieldComponent), 1);
    }

    render() {
      return (
        <FieldComponent
          onChange={this.props.onChangeHandler(fieldName, fieldCategory)}
          onFocusChange={this.props.onFocusChangeHandler(fieldName)}
          value={this.props.data[fieldCategory][fieldName]}
          errorMessage={this.props.errors[fieldName]}
        />
      );
    }
  }

  hoistNonReactStatic(ConnectedComponent, FieldComponent);

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedComponent);
};

export const ConnectToOrderDataFormV2 = (FieldComponent, metadata) => {
  const { fieldName, fieldCategory } = metadata;

  const fieldComponentDisplayName =
    metadata.displayName || metadata.name || 'Component';

  class ConnectedComponent extends Component {
    static propTypes = {
      data: PropTypes.shape({
        contractualData: PropTypes.object.isRequired,
        customer: PropTypes.object.isRequired
      }).isRequired,
      errors: PropTypes.object.isRequired,
      onChangeHandler: PropTypes.func.isRequired,
      onFocusChangeHandler: PropTypes.func.isRequired
    };

    static displayName = `ConnectToOrderDataForm(${fieldComponentDisplayName})`;

    componentDidMount() {
      renderedFormFields.push(metadata);
    }

    componentWillUnmount() {
      renderedFormFields.splice(renderedFormFields.indexOf(metadata), 1);
    }

    onChange = evt => {
      const val =
        metadata.valueReduxFormatter !== undefined
          ? metadata.valueReduxFormatter(evt.target.value)
          : evt.target.value;
      this.props.onChangeHandler(fieldName, fieldCategory)(val);
    };

    formattedDisplayValue = () => {
      return metadata.valueDisplayFormatter !== undefined
        ? metadata.valueDisplayFormatter(
            this.props.data[fieldCategory][fieldName]
          )
        : this.props.data[fieldCategory][fieldName];
    };

    render() {
      return (
        <FieldComponent
          {...metadata}
          onChange={this.onChange}
          onFocusChange={this.props.onFocusChangeHandler(fieldName)}
          onBlur={() =>
            this.props.onFocusChangeHandler(fieldName)({ focused: false })
          }
          onFocus={() =>
            this.props.onFocusChangeHandler(fieldName)({ focused: true })
          }
          value={this.formattedDisplayValue()}
          error={!isEmptyString(this.props.errors[fieldName])}
          errorMessage={this.props.errors[fieldName]}
        />
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedComponent);
};

export function getAllRenderedFormFields() {
  return renderedFormFields;
}

export default ConnectToOrderDataForm;
