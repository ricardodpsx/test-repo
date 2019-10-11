import moment from 'moment';
import Countries from '../edit/businessCustomerDataReview/firmDataReview/fields/CountryOptions';
import Positions from '../edit/businessCustomerDataReview/contactDataReview/fields/PositionOptions';
import messages from '../../messages/messages';

function formatDate(date, format) {
  return date ? moment(date).format(format) : null;
}

function fullDateFormat(date) {
  return formatDate(date, 'DD.MM.YYYY');
}

function monthDateFormat(date) {
  return formatDate(date, 'MM.YYYY');
}

function customerRequestDateFormat(customerRequestDate) {
  if (!customerRequestDate) return null;
  return `${fullDateFormat(customerRequestDate.startDate)} - ${fullDateFormat(
    customerRequestDate.endDate
  )}`;
}

const renderOptionalValue = value => {
  if (value && value.trim()) {
    return value;
  }
  return '-';
};

const getLabel = (category, value) => {
  const categoryValue = category.filter(item => item.value === value);
  if (!categoryValue || categoryValue.length !== 0) {
    return categoryValue[0].text;
  }
  return '';
};

const getGender = value => {
  return value !== 'female' ? 'Herr' : 'Frau';
};

function termsOfPayment(key) {
  const val = messages
    .get('termsOfPaymentOptions')
    .filter(item => item.value === key);
  return val.length && val[0].text;
}

function leasingRequest(key) {
  const val = messages
    .get('leasingRequestOptions')
    .filter(item => item.value === key);

  return val.length && val[0].text;
}

const contractData = ({ contractualData = {} }) => [
  {
    valueId: 'order-date',
    value: fullDateFormat((contractualData && contractualData.orderDate) || '')
  },
  {
    valueId: 'vehicle-paper-destination',
    value: contractualData.vehiclePaperDestination
  }
];

const dateData = ({ contractualData = {} }) => [
  {
    valueId: 'delivery-date',
    value: monthDateFormat(contractualData.requestedDeliveryDateFrom)
  },
  {
    valueId: 'customer-request-date',
    value: customerRequestDateFormat(contractualData.customerRequestDate)
  }
];

const fremdLeasing = ({ contractualData = {} }) => [
  {
    valueId: 'terms-of-payment',
    value: termsOfPayment(contractualData.termsOfPayment)
  },
  {
    valueId: 'leasing-request',
    value: leasingRequest(contractualData.leasingRequest)
  },
  { valueId: 'lessor-id', value: contractualData.lessorId }
];

const privateCustomerData = ({ customer = {} }) =>
  customer.customerType === 'private'
    ? [
        { value: customer.firstName, valueId: 'first-name' },
        { value: customer.lastName, valueId: 'last-name' },
        {
          value: `${customer.street} ${customer.houseNumber}`,
          valueId: 'street-number'
        },
        {
          value: `${customer.postalCode} ${customer.city}`,
          valueId: 'postal-code-city'
        }
      ]
    : [];

const businessCustomerData = ({ customer = {} }) =>
  customer.customerType === 'company'
    ? [
        { value: customer.company, valueId: 'company' },
        {
          value: renderOptionalValue(customer.companyNameExtension),
          valueId: 'company-name-extension'
        },
        {
          value: renderOptionalValue(
            [customer.street, customer.houseNumber].join(' ')
          ),
          valueId: 'street-number'
        },
        {
          value: renderOptionalValue(
            [customer.postalCode, customer.city].join(' ')
          ),
          valueId: 'postal-code-city'
        },
        {
          valueId: 'country',
          value: renderOptionalValue(getLabel(Countries, customer.country))
        },
        {
          value: renderOptionalValue(customer.companyPhoneBusiness),
          valueId: 'company-phone-business'
        }
      ]
    : null;

const contactDetails = ({ customer = {} }) =>
  customer.customerType === 'company'
    ? [
        { valueId: 'gender', value: getGender(customer.gender) },
        { valueId: 'title', value: renderOptionalValue(customer.title) },
        { valueId: 'first-name', value: customer.firstName },
        { valueId: 'last-name', value: customer.lastName },
        { valueId: 'suffix', value: renderOptionalValue(customer.suffix) },
        {
          valueId: 'phone-business',
          value: renderOptionalValue(customer.phoneBusiness)
        },
        { valueId: 'email', value: renderOptionalValue(customer.email) },
        {
          valueId: 'position',
          value: renderOptionalValue(getLabel(Positions, customer.position))
        }
      ]
    : null;

const furtherData = ({ contractualData = {} }) => [
  { valueId: 'vbet-number', value: contractualData.vbetNumber }
];

const salesPerson = ({ contractualData = {}, isOwnRetailer = {} }) =>
  isOwnRetailer
    ? [
        {
          valueId: 'responsible-salesperson-name',
          value: contractualData.responsibleSellerName
        },
        {
          valueId: 'responsible-salesperson-id',
          value: contractualData.responsibleSellerId
        },
        {
          valueId: 'responsible-salesperson-community-no',
          value: contractualData.responsibleSellerCommunityNo
        },
        {
          valueId: 'advisory-salesperson-name',
          value: contractualData.advisorySellerName
        },
        {
          valueId: 'advisory-salesperson-id',
          value: contractualData.advisorySellerId
        }
      ]
    : null;

const sondervereinbarungen = ({ contractualData = {} }) => [
  {
    valueId: 'order-summary-sondervereinbarungen-value',
    value: contractualData.sondervereinbarungen,
    includeLabel: false
  }
];

export default function viewModel(data) {
  return {
    contractData: contractData(data),
    dateData: dateData(data),
    fremdLeasing: fremdLeasing(data),
    privateCustomerData: privateCustomerData(data),
    businessCustomerData: businessCustomerData(data),
    contactDetails: contactDetails(data),
    furtherData: furtherData(data),
    salesPerson: salesPerson(data),
    sondervereinbarungen: sondervereinbarungen(data)
  };
}
