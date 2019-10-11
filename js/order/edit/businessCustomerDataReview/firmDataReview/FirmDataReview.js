import React, { Fragment } from 'react';
import Street from '../../customerDataReview/fields/Street';
import HouseNumber from '../../customerDataReview/fields/HouseNumber';
import PostalCode from '../../customerDataReview/fields/PostalCode';
import City from '../../customerDataReview/fields/City';
import messages from '../../../../messages/messages';
import styles from './FirmDataReview.css';
import FirmName from './fields/FirmName';
import FirmNameExtension from './fields/FirmaNameExtension';
import Country from './fields/Country';
import VatNumber from './fields/VatNumber';
import AccountNumber from './fields/AccountNumber';
import CompanyBedarfstraegernummer from './fields/CompanyBedarfstraegernummer';
import PhoneBusiness from './fields/CompanyPhoneBusiness';

function FirmDataReview() {
  return (
    <Fragment>
      <section className={styles.firmDataReviewContainer}>
        <h4>{messages.get('firma')}</h4>
        <section className={styles.firmDataReview}>
          <div>
            <div>
              <div>
                <FirmName />
              </div>
              <div>
                <FirmNameExtension />
              </div>
              <div>
                <Street />
                <HouseNumber />
              </div>
              <div>
                <PostalCode />
                <City />
              </div>
              <div>
                <Country />
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div>
              <div>
                <PhoneBusiness />
              </div>
              <div>
                <VatNumber />
              </div>
              <div>
                <AccountNumber />
                <CompanyBedarfstraegernummer />
              </div>
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
}

export default FirmDataReview;
