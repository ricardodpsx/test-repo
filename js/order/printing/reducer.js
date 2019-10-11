import {
  defaultPrintingOptions,
  evEnabled,
  orderSelected,
  setOption
} from './printingOptionsModel';
import { ACTIONS } from './constants';

export default (state = defaultPrintingOptions(), action = {}) => {
  switch (action.type) {
    case ACTIONS.DEFAULT_OPTIONS:
      return orderSelected(state, action.customerType);
    case ACTIONS.SET_OPTION:
      return setOption(state, action.name, action.value, action.customerType);
    case ACTIONS.ENABLE_EV:
      return evEnabled(state, action.pricingDataWithCustomerType);
    default:
      return state;
  }
};
