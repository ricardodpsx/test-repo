import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.css';
import viewModel from './OrderSummaryViewModel';
import messages from '../../messages/messages';
import { isEmptyString } from '../../utils/stringUtil';

function dashToUnderscore(valueId) {
  return valueId.replace(/-/g, '_');
}

function OrderSummary({ data, featureToggles, isOwnRetailer }) {
  const isBlank = str => !str.value || str.value.trim() === '';

  const SubTitle = titleKey =>
    titleKey ? <h4>{messages.get(dashToUnderscore(titleKey))}</h4> : null;

  const Title = titleKey =>
    titleKey ? <h3>{messages.get(dashToUnderscore(titleKey))}</h3> : null;

  const view = viewModel({ ...data, isOwnRetailer });

  const SummaryField = ({
    label,
    value,
    valueId,
    includeLabel = true,
    ...other
  }) => {
    if (other.togglename && featureToggles[other.togglename] === false)
      return null;

    if (isEmptyString(value)) return null;

    const labelKey = dashToUnderscore(valueId);

    return (
      <div {...other}>
        {includeLabel && <dt>{messages.get(labelKey)}</dt>}
        <dd id={valueId} className={styles[valueId]}>
          {value}
        </dd>
      </div>
    );
  };

  SummaryField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    valueId: PropTypes.string.isRequired,
    includeLabel: PropTypes.bool
  };

  SummaryField.defaultProps = {
    label: null,
    value: null,
    includeLabel: true
  };

  const Section = ({ titleKey, children }) => {
    return children.some(c => c.props.sectionData != null) ? (
      <div className={styles.section}>
        {Title(titleKey)}
        <div className={styles.row}> {children} </div>
      </div>
    ) : null;
  };

  Section.propTypes = {
    titleKey: PropTypes.string,
    children: PropTypes.array.isRequired
  };

  Section.defaultProps = {
    titleKey: null
  };

  function summaryFieldsList(fieldData) {
    return (
      <dl>
        {fieldData.map(({ valueId, ...etc }) => (
          <SummaryField key={valueId} valueId={valueId} {...etc} />
        ))}
      </dl>
    );
  }

  const SummarySection = ({
    sectionId,
    sectionData,
    titleLevel = Title,
    ...other
  }) => {
    if (!sectionData || sectionData.length === 0) return null;
    if (other.togglename && featureToggles[other.togglename] === false)
      return null;
    if (sectionData.filter(it => !isBlank(it)).length === 0) return null;

    return (
      <div {...other} id={sectionId}>
        {titleLevel(sectionId)}
        {summaryFieldsList(sectionData)}
      </div>
    );
  };

  SummarySection.propTypes = {
    sectionId: PropTypes.string.isRequired,
    sectionData: PropTypes.array,
    titleLevel: PropTypes.func
  };

  SummarySection.defaultProps = {
    sectionData: null,
    titleLevel: Title
  };

  return (
    <div className={styles.orderSummary}>
      <Section>
        <SummarySection
          className={styles.col}
          sectionId="general-contract-data"
          sectionData={view.contractData}
        />
        <SummarySection
          className={styles.col}
          sectionId="general-date-data"
          sectionData={view.dateData}
        />
      </Section>

      <SummarySection
        sectionId="order-summary-sondervereinbarungen"
        sectionData={view.sondervereinbarungen}
        className={`${styles.section} ${styles.textarea}`}
      />

      <SummarySection
        togglename="FREMD_LEASING_TOGGLE"
        sectionId="fremd-leasing"
        sectionData={view.fremdLeasing}
        className={styles.section}
      />

      <SummarySection
        sectionId="customer-data"
        sectionData={view.privateCustomerData}
        className={styles.section}
      />

      <Section titleKey="company-data" hasData={!!view.businessCustomerData}>
        <SummarySection
          sectionId="company-details"
          sectionData={view.businessCustomerData}
          className={styles.col}
          titleLevel={SubTitle}
        />
        <SummarySection
          sectionId="contact-details"
          sectionData={view.contactDetails}
          className={styles.col}
          titleLevel={SubTitle}
        />
      </Section>

      <SummarySection
        sectionId="further-data"
        sectionData={view.furtherData}
        className={styles.section}
      />

      <SummarySection
        togglename="SALES_COMMUNITY_TOGGLE"
        sectionId="sales-community"
        sectionData={view.salesPerson}
        className={styles.section}
      />
    </div>
  );
}

OrderSummary.propTypes = {
  data: PropTypes.shape({
    customer: PropTypes.object.isRequired,
    contractualData: PropTypes.shape({
      vbetNumber: PropTypes.string,
      orderDate: PropTypes.string,
      requestedDeliveryDateFrom: PropTypes.string,
      sondervereinbarungen: PropTypes.string,
      leasingRequest: PropTypes.string,
      termsOfPayment: PropTypes.string,
      customerId: PropTypes.string
    })
  }).isRequired,
  featureToggles: PropTypes.object,
  isOwnRetailer: PropTypes.bool
};

OrderSummary.defaultProps = {
  featureToggles: {},
  isOwnRetailer: true
};

export default OrderSummary;
