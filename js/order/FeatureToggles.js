import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { getOptions, postOptions } from '../serviceCommon';
import { ORDER_DATA_URL_BASE_PATH } from '../constants';

const getToggles = token => {
  const featureTogglesUrl = `${ORDER_DATA_URL_BASE_PATH}/feature-toggle-page?token=${token}`;
  return fetch(featureTogglesUrl, getOptions).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject();
  });
};
const toggleFeature = (featureName, featureValue, token) => {
  const featureTogglesUrl = `${ORDER_DATA_URL_BASE_PATH}/feature-toggle-page?token=${token}`;
  return fetch(featureTogglesUrl, {
    ...postOptions,
    body: JSON.stringify({ name: featureName, value: featureValue })
  });
};
class FeatureToggles extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      toggles: {}
    };
  }
  componentDidMount() {
    const [toggles, setToggles] = this.useState({});
    const params = queryString.parse(this.props.location.search);
    if (Object.keys(toggles).length === 0)
      getToggles(params.token).then(setToggles);
  }
  useState() {
    const setToggles = toggles => this.setState({ toggles });
    const toggles = this.state.toggles;
    return [toggles, setToggles];
  }
  toggleFeatureAndFetchToggles = (setToggles, k, v) => {
    const token = queryString.parse(this.props.location.search).token;
    toggleFeature(k, !v, token).then(() => getToggles(token).then(setToggles));
  };
  renderFeatureToggles = () => {
    const [toggles, setToggles] = this.useState({});
    return Object.entries(toggles).map(([featureName, featureValue]) => (
      <div>
        <input
          type="checkbox"
          checked={featureValue}
          onClick={() =>
            this.toggleFeatureAndFetchToggles(
              setToggles,
              featureName,
              featureValue
            )
          }
        />{' '}
        {featureName}
      </div>
    ));
  };
  render() {
    return <div>{this.renderFeatureToggles()}</div>;
  }
}
export default FeatureToggles;
