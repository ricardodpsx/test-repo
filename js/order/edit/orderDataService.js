import { getOptions, postOptions } from '../../serviceCommon';
import { ORDER_DATA_URL_BASE_PATH } from '../../constants';
import { isEmptyString } from '../../utils/stringUtil';
import messages from '../../messages/messages';

class DateRange {
  constructor(endDate, startDate) {
    this.endDate = endDate || null;
    this.startDate = startDate || null;
  }
}

class SalesPerson {
  constructor(name, id, communityNumber) {
    this.name = name || null;
    this.id = id || null;
    this.communityNumber = communityNumber || null;
  }
}

class Lessor {
  constructor(id) {
    this.id = id || null;
  }
}

class ContractualDataRequestPayload {
  constructor(contractualData) {
    this.vbetNumber = contractualData.vbetNumber;
    this.orderDate = contractualData.orderDate;
    this.vehiclePaperDestination = contractualData.vehiclePaperDestination;
    this.requestedDeliveryDateFrom = contractualData.requestedDeliveryDateFrom;
    this.agreedDeliveryDate =
      contractualData.agreedDeliveryDate &&
      new DateRange(
        contractualData.agreedDeliveryDate.endDate,
        contractualData.agreedDeliveryDate.startDate
      );
    this.customerRequestDate =
      contractualData.customerRequestDate &&
      new DateRange(
        contractualData.customerRequestDate.endDate,
        contractualData.customerRequestDate.startDate
      );
    if (
      !isEmptyString(contractualData.responsibleSellerName) &&
      !isEmptyString(contractualData.responsibleSellerId)
    ) {
      this.responsibleSalesPerson = new SalesPerson(
        contractualData.responsibleSellerName,
        contractualData.responsibleSellerId,
        contractualData.responsibleSellerCommunityNo
      );
    }
    if (
      !isEmptyString(contractualData.advisorySellerName) ||
      !isEmptyString(contractualData.advisorySellerId)
    ) {
      this.advisorySalesPerson = new SalesPerson(
        contractualData.advisorySellerName,
        contractualData.advisorySellerId
      );
    }
    this.sondervereinbarungen = contractualData.sondervereinbarungen;
    this.leasingRequest =
      contractualData.leasingRequest ||
      messages.get('leasingRequestOptions')[0].value;
    this.termsOfPayment =
      contractualData.termsOfPayment ||
      messages.get('termsOfPaymentOptions')[0].value;
    if (!isEmptyString(contractualData.lessorId)) {
      this.lessor = new Lessor(contractualData.lessorId);
    }
  }
}

export class ContractualDataResponsePayload {
  constructor(contractualData) {
    this.vbetNumber = contractualData.vbetNumber;
    this.orderDate = contractualData.orderDate;
    this.vehiclePaperDestination = contractualData.vehiclePaperDestination;
    this.requestedDeliveryDateFrom = contractualData.requestedDeliveryDateFrom;
    this.agreedDeliveryDate = contractualData.agreedDeliveryDate;
    this.customerRequestDate = contractualData.customerRequestDate;
    this.responsibleSellerName =
      contractualData.responsibleSalesPerson &&
      contractualData.responsibleSalesPerson.name;
    this.responsibleSellerId =
      contractualData.responsibleSalesPerson &&
      contractualData.responsibleSalesPerson.id;
    this.responsibleSellerCommunityNo =
      contractualData.responsibleSalesPerson &&
      contractualData.responsibleSalesPerson.communityNumber;
    this.advisorySellerName =
      contractualData.advisorySalesPerson &&
      contractualData.advisorySalesPerson.name;
    this.advisorySellerId =
      contractualData.advisorySalesPerson &&
      contractualData.advisorySalesPerson.id;
    this.sondervereinbarungen = contractualData.sondervereinbarungen;
    this.leasingRequest =
      contractualData.leasingRequest ||
      messages.get('leasingRequestOptions')[0].value;
    this.termsOfPayment =
      contractualData.termsOfPayment ||
      messages.get('termsOfPaymentOptions')[0].value;
    this.lessorId = contractualData.lessor && contractualData.lessor.id;
  }
}

class FormService {
  constructor() {
    this.baseUrl = `${ORDER_DATA_URL_BASE_PATH}`;
  }

  async save(dealId, formData) {
    const revisedContractualData = new ContractualDataRequestPayload(
      formData.contractualData
    );
    const orderOptions = {
      ...postOptions,
      body: JSON.stringify({
        ...formData,
        contractualData: revisedContractualData
      })
    };
    const contractOrderUrl = `${this.baseUrl}/deal/${dealId}/order/contract`;

    try {
      const response = await fetch(contractOrderUrl, orderOptions);
      if (response.ok) {
        return Promise.resolve();
      }
      const errorMessage = await response.text();
      return Promise.reject(errorMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  load(dealId) {
    const contractOrderUrl = `${this.baseUrl}/deal/${dealId}/order/contract`;
    return fetch(contractOrderUrl, getOptions).then(response => {
      if (response.ok) {
        return response
          .json()
          .then(data => {
            const revisedContractualPayload =
              data.contractualData &&
              new ContractualDataResponsePayload(data.contractualData);
            // TODO: Not sure about this - assigment to lambda parameter?
            // eslint-disable-next-line
            data.contractualData = revisedContractualPayload;
            const isOwnRetailer = response.headers.get('x-is-own-retailer');
            if (isOwnRetailer == null)
              throw new Error("Couldn't identify retailer type");
            return Object.assign({}, data, {
              isOwnRetailer: isOwnRetailer === 'true'
            });
          })
          .catch(error => Promise.reject(error));
      }
      return Promise.reject();
    });
  }
}

const orderDataService = new FormService();
export default orderDataService;
