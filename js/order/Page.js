import React from 'react';
import PropTypes from 'prop-types';
import styles from './Page.css';
import ResponsiveContainerWideScreen from '../UIComponents/ResponsiveContainerWideScreen';

function Page({ children }) {
  return (
    <div className={styles.page}>
      <ResponsiveContainerWideScreen>{children}</ResponsiveContainerWideScreen>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Page;
