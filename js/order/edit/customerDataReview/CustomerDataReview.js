import React, { Fragment } from 'react';
import FirstName from './fields/FirstName';
import LastName from './fields/LastName';
import Street from './fields/Street';
import HouseNumber from './fields/HouseNumber';
import PostalCode from './fields/PostalCode';
import City from './fields/City';
import messages from '../../../messages/messages';
import AccountNumber from '../businessCustomerDataReview/firmDataReview/fields/AccountNumber';
import Bedarfstraegernummer from './fields/Bedarfstraegernummer';

import styles from './CustomerDataReview.css';

function CustomerDataReview() {
  return (
    <Fragment>
      <h3>{messages.get('customer_data_review')}</h3>
      <section className={styles.customerDataReview}>
        <div>
          <div>
            <div>
              <FirstName />
              <LastName />
            </div>
            <div>
              <AccountNumber />
              <Bedarfstraegernummer />
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <div>
              <Street />
              <HouseNumber />
            </div>
            <div>
              <PostalCode />
              <City />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default CustomerDataReview;
