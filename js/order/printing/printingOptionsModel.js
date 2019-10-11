import { OPTIONS } from './constants';

const clone = obj => JSON.parse(JSON.stringify(obj));

export const option = value => ({
  value,
  checked: false,
  disabled: false
});

export const checked = opt => ({ ...opt, checked: true });
export const unchecked = opt => ({ ...opt, checked: false });
export const disabled = opt => ({ ...opt, disabled: true });
export const enabled = opt => ({ ...opt, disabled: false });
export const setValue = (opt, isSelected) => ({
  ...opt,
  checked: isSelected
});

export const updateOptions = (options, value, callback) =>
  options.map(opt =>
    [].concat(...[value]).includes(opt.value) ? callback(opt) : opt
  );

const uncheckSection = section => {
  return {
    ...section,
    header: unchecked(section.header),
    options: section.options.map(x => disabled(unchecked(x)))
  };
};

const flat = list => list.reduce((acc, val) => acc.concat(val), []);

export const selectedOptions = sections =>
  flat(
    sections.map(({ options }) =>
      options.filter(o => o.checked).map(o => o.value)
    )
  );

const orderHeader = option(OPTIONS.ORDER);
const abbHeader = option(OPTIONS.ABB);

const orderBaseCase = (st = {}, customerType = 'private') => ({
  ...st,
  header: checked(orderHeader),
  options: [
    checked(disabled(option(OPTIONS.BESTELLUNG))),
    st.hasAdditionalAgreements
      ? checked(option(OPTIONS.EVB))
      : disabled(option(OPTIONS.EVB)),
    customerType === 'private'
      ? checked(disabled(option(OPTIONS.VERBRAUCHERINFORMATION)))
      : enabled(option(OPTIONS.VERBRAUCHERINFORMATION)),
    enabled(option(OPTIONS.WIDERRUFSBELEHRUNG)),
    checked(disabled(option(OPTIONS.AGB))),
    checked(disabled(option(OPTIONS.SIGNATUR)))
  ]
});

const abbBaseCase = () => ({
  header: checked(abbHeader),
  options: [checked(disabled(option(OPTIONS.ABB)))]
});

export const orderSelected = ([orderSection, abbSection], customerType) => [
  orderBaseCase(orderSection, customerType),
  uncheckSection(abbBaseCase(abbSection))
];

export const defaultPrintingOptions = () => orderSelected([]);

const findOption = (options, value) => options.find(opt => opt.value === value);

export const printingOptions = (
  [orderSection, abbSection],
  { isChangeOrder, isOwnRetailer }
) => {
  const newOrderSection = clone(orderSection);

  if (isChangeOrder === true && newOrderSection.header.checked) {
    findOption(newOrderSection.options, OPTIONS.AGB).disabled = false;
  }

  if (isOwnRetailer === false) {
    newOrderSection.options = newOrderSection.options.filter(
      opt => opt.value !== OPTIONS.EVB
    );
  }

  return [newOrderSection, abbSection];
};

export const abbSelected = ([orderSection, abbSection]) => [
  uncheckSection(orderSection),
  abbBaseCase(abbSection)
];

export const setOption = (
  [orderSection, abbSection],
  name,
  isSelected,
  customerType
) => {
  if (name === OPTIONS.ORDER)
    return orderSelected([orderSection, abbSection], customerType);

  if (name === OPTIONS.ABB) return abbSelected([orderSection, abbSection]);

  return [
    {
      ...orderSection,
      options: updateOptions(orderSection.options, name, op =>
        setValue(op, isSelected)
      )
    },
    abbSection
  ];
};

export const evEnabled = (
  [orderSection, abbSection],
  pricingDataWithCustomerType = {}
) => [
  orderBaseCase(
    {
      ...orderSection,
      hasAdditionalAgreements:
        pricingDataWithCustomerType.hasAdditionalAgreements
    },
    pricingDataWithCustomerType.customerType
  ),
  abbSection
];
