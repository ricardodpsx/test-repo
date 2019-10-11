import { all, call, put, takeLatest } from 'redux-saga/effects';
import actionTypes from '../../actionTypes';
import orderService from '../preview/orderService';
import {
  createBanner,
  createOrderFailure,
  createOrderSuccess,
  createOrderSuccessBanner,
  goToDealPicker,
  orderRequestInProgress
} from '../../actionCreators';
import messages from '../../messages/messages';

function* sendOrderToGO({ dealId }) {
  try {
    yield put(orderRequestInProgress());
    const { preOrderNumber } = yield call([orderService, 'postOrder'], dealId);
    yield put(goToDealPicker());
    yield put(createOrderSuccess(preOrderNumber));
    yield put(createOrderSuccessBanner(preOrderNumber));
  } catch (error) {
    yield put(createOrderFailure());
    yield error.displayMessage
      ? put(createBanner('ERROR', error.displayMessage))
      : put(createBanner('ERROR', messages.get('order_creation_failed')));
  }
}

function* sendOrderToGOSaga() {
  yield takeLatest(actionTypes.ORDER_CREATION_SENT, sendOrderToGO);
}

function* orderSagas() {
  yield all([sendOrderToGOSaga()]);
}

export default orderSagas;
