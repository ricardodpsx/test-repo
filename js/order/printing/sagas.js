import actionTypes from '../../actionTypes';
import { enableEv } from '../../actionCreators';
import printingService from './printingService';
import pricingService from './pricingService';

export default [
  {
    intendedAction: actionTypes.LOAD_PRICING_DATA,
    serviceToCall: ({ dealId, isChangeOrder, customerType }) =>
      pricingService.getPricingData(dealId, isChangeOrder, customerType),
    actionToCallAfter: pricingDataWithCustomerType =>
      enableEv(pricingDataWithCustomerType)
  },
  {
    intendedAction: actionTypes.PRINT_ORDER,
    serviceToCall: ({ dealId, options, isChangeOrder }) =>
      printingService.print(dealId, options, isChangeOrder)
  }
];
