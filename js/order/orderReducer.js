import actionTypes from '../actionTypes';

export const defaultState = {
  preOrderNumber: null,
  status: { state: 'loading', date: null }
};

export function orderReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.ORDER_INIT:
      return defaultState;
    case actionTypes.ORDER_CREATION_SUCCESSFUL:
      return {
        ...state,
        preOrderNumber: action.preOrderNumber,
        requestInProgress: false
      };
    case actionTypes.ORDER_CREATION_FAILED:
      return {
        ...state,
        preOrderNumber: null,
        requestInProgress: false
      };

    case actionTypes.ORDER_STATUS_LOADED:
      return {
        ...state,
        status: action.orderStatus
      };
    case actionTypes.ORDER_REQUEST_IN_PROGRESS:
      return {
        ...state,
        requestInProgress: action.requestInProgress
      };
    default: {
      return state;
    }
  }
}
