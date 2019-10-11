import { ORDER_DATA_URL_BASE_PATH } from '../../constants';
import { getOptions, postOptions } from '../../serviceCommon';

class OrderService {
  constructor() {
    this.baseUrl = `${ORDER_DATA_URL_BASE_PATH}`;
  }

  sendRequest = async (preOrderUrl, orderOptions) => {
    try {
      const response = await fetch(preOrderUrl, orderOptions);
      const json = await response.json();
      if (response.ok) {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  postOrder = dealId => {
    const orderOptions = {
      ...postOptions
    };
    const preOrderUrl = `${this.baseUrl}/deal/${dealId}/order`;
    return this.sendRequest(preOrderUrl, orderOptions);
  };

  timeBoundConfigurationInfo = dealId => {
    const orderOptions = {
      ...getOptions
    };
    const preOrderUrl = `${this.baseUrl}/deal/${dealId}/timeBoundConfiguration`;
    return this.sendRequest(preOrderUrl, orderOptions);
  };
}

const orderService = new OrderService();
export default orderService;
