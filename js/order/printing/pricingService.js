import { ORDER_DATA_URL_BASE_PATH } from '../../constants';
import { getOptions } from '../../serviceCommon';

export default {
  getPricingData: (dealId, isChangeOrder, customerType) => {
    return fetch(
      `${ORDER_DATA_URL_BASE_PATH}/deal/${dealId}/pricing?isPrintChangeOrder=${isChangeOrder}`,
      getOptions
    )
      .then(response => response.ok && response.json())
      .then(json => json && { ...json, customerType });
  }
};
