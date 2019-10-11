import actionTypes from '../actionTypes';
import { loadOrderStatus } from './orderStatusService';
import { orderStatusLoaded } from '../actionCreators';

export default [
  {
    intendedAction: actionTypes.ORDER_STATUS_LOAD,
    serviceToCall: ({ dealId }) => loadOrderStatus(dealId),
    actionToCallAfter: orderStatus => orderStatusLoaded(orderStatus)
  }
];
