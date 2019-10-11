import { all, call, put, takeLatest } from 'redux-saga/effects';
// Todo:  #Dry This should be automatic
// Todo: #Inconsistency, should be similar to frontend/src/order/orderSagas.js

import printingSagas from './printing/sagas';
import orderSagas from './orderSagas';

import { createBanner } from '../actionCreators';
import messages from '../messages/messages';

const sagas = printingSagas.concat(orderSagas);

function sagaActionProcessor(actionToCall, serviceToCall, onError) {
  // eslint-disable-next-line func-names
  return function*(intendedAction) {
    try {
      const response = yield call(() => serviceToCall(intendedAction));
      const action = actionToCall(response);
      if (action) yield put(action);
    } catch (e) {
      const errorAction = onError(e);
      if (errorAction) yield put(errorAction);
    }
  };
}

function* initializeSagas() {
  // eslint-disable-next-line
  for (let i = 0; i < sagas.length; i++) {
    const {
      intendedAction,
      serviceToCall,
      actionToCallAfter = () => {},
      onError = () => createBanner('ERROR', messages.get('load_error'))
    } = sagas[i];

    yield takeLatest(
      intendedAction,
      sagaActionProcessor(actionToCallAfter, serviceToCall, onError)
    );
  }
}

function* declaredSagas() {
  yield all([initializeSagas()]);
}

export default declaredSagas;
