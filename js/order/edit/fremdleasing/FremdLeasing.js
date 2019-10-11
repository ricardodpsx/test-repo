import React, { Fragment } from 'react';
import messages from '../../../messages/messages';
import styles from './Fremdleasing.css';
import TermsOfPayment from './fields/TermsOfPayment';
import LessorId from './fields/LessorId';
import LeasingRequest from './fields/LeasingRequest';

function FremdLeasing() {
  return (
    <Fragment>
      <h3>{messages.get('fremd_leasing')}</h3>
      <section className={styles.fremdLeasingFirstSection}>
        <div>
          <TermsOfPayment />
        </div>
        <hr />
        <div>
          <LeasingRequest />
        </div>
      </section>
      <section className={styles.fremdLeasingSecondSection}>
        <div>
          <LessorId />
        </div>
      </section>
    </Fragment>
  );
}

export default FremdLeasing;
