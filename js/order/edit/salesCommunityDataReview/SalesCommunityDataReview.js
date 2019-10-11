import React from 'react';
import messages from '../../../messages/messages';
import styles from './SalesCommunityDataReview.css';
import ResponsibleSellerName from './fields/ResponsibleSellerName';
import ResponsibleSellerId from './fields/ResponsibleSellerId';
import ResponsibleSellerCommunityNo from './fields/ResponsibleSellerCommunityNo';
import AdvisorySellerName from './fields/AdvisorySellerName';
import AdvisorySellerId from './fields/AdvisorySellerId';

function SalesCommunityDataReview() {
  return (
    <section className={styles.salesCommunityDataReview}>
      <h3>{messages.get('sales_community')}</h3>
      <div className={styles.salesPersonsList}>
        <div className={styles.SalesPersonInfo}>
          <ResponsibleSellerName />
          <ResponsibleSellerId />
          <ResponsibleSellerCommunityNo />
        </div>
        <div className={styles.SalesPersonInfo}>
          <AdvisorySellerName />
          <AdvisorySellerId />
        </div>
      </div>
    </section>
  );
}

export default SalesCommunityDataReview;
