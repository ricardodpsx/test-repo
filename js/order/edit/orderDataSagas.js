import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import actionTypes from '../../actionTypes';
import orderDataService from './orderDataService';
import messages from '../../messages/messages';
import {
  createBanner,
  goToPreview,
  orderDataFormSavedFailed,
  orderDataLoadedFailed,
  orderDataLoadedSucceed
} from '../../actionCreators';
import { getHistory } from '../../history';

function isFormValid(errors) {
  return Object.keys(errors).reduce(
    (mem, error) => mem && !errors[error],
    true
  );
}

function* loadOrderData({ dealId }) {
  try {
    const data = yield call([orderDataService, 'load'], dealId);
    yield put(orderDataLoadedSucceed(data));
  } catch (error) {
    yield put(orderDataLoadedFailed(error && error.message));
  }
}

function* loadOrderDataSaga() {
  yield takeLatest(actionTypes.ORDER_DATA_LOAD, loadOrderData);
}

function* saveOrderData({ dealId }) {
  const { data, errors } = yield select(state => state.order.form);
  if (!isFormValid(errors)) {
    yield put(createBanner('ERROR', messages.get('order_form_save_failed')));
    return;
  }

  try {
    yield call([orderDataService, 'save'], dealId, data);
    const history = getHistory();
    const state = history.location.state;
    yield put(
      goToPreview(dealId, state && state.goBack ? state.goBack : undefined)
    );
  } catch (error) {
    yield put(orderDataFormSavedFailed(error && error.message));
    yield put(createBanner('ERROR', messages.get('order_form_save_failed')));
  }
}

function* saveOrderDataSaga() {
  yield takeLatest(actionTypes.ORDER_FORM_SAVE_AND_PREVIEW, saveOrderData);
}

function* orderDataSagas() {
  yield all([loadOrderDataSaga(), saveOrderDataSaga()]);
}

export default orderDataSagas;
