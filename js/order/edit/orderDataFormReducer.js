import moment from 'moment';
import actionTypes from '../../actionTypes';
import flattenObject from '../../utils/flattenObject';
import { getAllRenderedFormFields } from './ConnectToOrderDataForm';

export const defaultState = {
  data: {
    contractualData: {
      leasingRequest: 'NO_LEASE_REQUEST',
      termsOfPayment: 'PAY_LATER',
      orderDate: moment().format('YYYY-MM-DD'),
      sondervereinbarungen: ''
    },
    customer: {
      customerType: 'private',
      position: 'EMPLOYEE',
      country: 'DE'
    }
  },
  errors: {}
};

const validate = (flattenData, fieldName) =>
  getAllRenderedFormFields().reduce((errors, Component) => {
    if (!fieldName || Component.fieldName === fieldName) {
      return {
        ...errors,
        [Component.fieldName]: Component.validator.check(
          flattenData[Component.fieldName]
        )
      };
    }
    return errors;
  }, {});

const removeError = (errors, fieldName) =>
  Object.keys(errors).reduce((newErrors, error) => {
    if (error !== fieldName) {
      return {
        ...newErrors,
        [error]: errors[error]
      };
    }
    return newErrors;
  }, {});

function orderDataFormReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.ORDER_INIT:
      return defaultState;
    case actionTypes.ORDER_DATA_LOADED_SUCCEED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
          contractualData: {
            ...state.data.contractualData,
            ...action.data.contractualData
          },
          customer: {
            ...state.data.customer,
            ...action.data.customer
          }
        }
      };
    case actionTypes.ORDER_FORM_VALUE_CHANGED: {
      const { fieldName, fieldCategory, fieldValue } = action;
      const data = { [fieldName]: fieldValue };
      const categorizedData = {
        [fieldCategory]: {
          ...state.data[fieldCategory],
          ...data
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          ...(fieldCategory ? categorizedData : data)
        }
      };
    }
    case actionTypes.ORDER_FORM_RESET_ERROR:
      return {
        ...state,
        errors: removeError(state.errors, action.fieldName)
      };
    case actionTypes.ORDER_FORM_SAVE_AND_PREVIEW:
    case actionTypes.ORDER_FORM_VALIDATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...validate(flattenObject(state.data), action.fieldName)
        }
      };
    default: {
      return state;
    }
  }
}

export { orderDataFormReducer };
