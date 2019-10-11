import { ORDER_DATA_URL_BASE_PATH } from '../../constants';

export default {
  print: (dealId, options, isChangeOrder) => {
    window.open(
      `${ORDER_DATA_URL_BASE_PATH}/deal/${dealId}/pdf-document?docs=${options.join(
        ','
      )}&isChangeOrder=${isChangeOrder}`,
      '_blank'
    );
  }
};
