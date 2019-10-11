import React, { Fragment } from 'react';
import messages from '../../../../messages/messages';
import styles from './ContactDataReview.css';
import Title from './fields/Title';
import FirstName from '../../customerDataReview/fields/FirstName';
import LastName from '../../customerDataReview/fields/LastName';
import Suffix from '../../businessCustomerDataReview/contactDataReview/fields/Suffix';
import PhoneBusiness from './fields/PhoneBusiness';
import Email from './fields/Email';
import Position from './fields/Position';
import Gender from './fields/Gender';

function ContactDataReview() {
  return (
    <Fragment>
      <section className={styles.contactDataReviewContainer}>
        <h4>{messages.get('contact')}</h4>
        <section className={styles.contactDataReview}>
          <div>
            <div>
              <div>
                <Gender />
                <Title />
              </div>
              <div>
                <FirstName />
              </div>
              <div>
                <LastName />
              </div>
              <div>
                <Suffix />
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
                <Email />
              </div>
              <div>
                <Position />
              </div>
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
}

export default ContactDataReview;
