import { ORDER_DATA_URL_BASE_PATH } from '../constants';
import { getOptions } from '../serviceCommon';

export const loadOrderStatus = dealId => {
  return fetch(
    `${ORDER_DATA_URL_BASE_PATH}/tile/details/deal/${dealId}`,
    getOptions
  ).then(response => response.ok && response.json());
};
