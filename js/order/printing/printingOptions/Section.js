import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.css';
import CheckboxField from './CheckboxField';

function Section({ header, options, onChange, customerType, isChangeOrder }) {
  return (
    <div key={header.value}>
      <div className={styles.sectionHeader}>
        <CheckboxField
          onChange={onChange}
          {...header}
          customerType={customerType}
          isChangeOrder={isChangeOrder}
          isHeader
        />
      </div>
      <div className={styles.checkboxColumns}>
        <div className={styles.column}>
          {options.map((option, idx) => {
            if (idx < options.length / 2) {
              return (
                <CheckboxField
                  key={option.value}
                  onChange={onChange}
                  customerType={customerType}
                  isChangeOrder={isChangeOrder}
                  {...option}
                />
              );
            }
            return null;
          })}
        </div>
        <div className={styles.column}>
          {options.map((option, idx) => {
            if (idx >= options.length / 2) {
              return (
                <CheckboxField
                  key={option.value}
                  onChange={onChange}
                  {...option}
                  customerType={customerType}
                  isChangeOrder={isChangeOrder}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

Section.propTypes = {
  header: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  customerType: PropTypes.string.isRequired,
  isChangeOrder: PropTypes.bool.isRequired
};

export default Section;
