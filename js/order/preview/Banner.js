import React from 'react';
import PropTypes from 'prop-types';
import bannerStyle from './Banner.css';

const Banner = props => {
  return (
    <div className={bannerStyle.warning}>
      <div className={bannerStyle.bannerText}>
        <span id="warning-banner">{props.text}</span>
      </div>
    </div>
  );
};

Banner.propTypes = {
  text: PropTypes.object.isRequired
};

export default Banner;
