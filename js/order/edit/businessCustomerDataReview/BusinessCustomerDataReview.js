import React, { Fragment } from 'react';
import messages from '../../../messages/messages';
import FirmDataReview from './firmDataReview/FirmDataReview';
import ContactDataReview from './contactDataReview/ContactDataReview';

function BusinessCustomerDataReview() {
  return (
    <Fragment>
      <h3>{messages.get('contact_data_review')}</h3>
      <section>
        <FirmDataReview />
        <ContactDataReview />
      </section>
    </Fragment>
  );
}

export default BusinessCustomerDataReview;
