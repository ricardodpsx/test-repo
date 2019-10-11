import React, { Component } from 'react';
import Button from '@otr/core-button';
import { postOptions } from '../serviceCommon';
import { ORDER_DATA_URL_BASE_PATH } from '../constants';
import styles from './GoUtility.css';

class GoUtility extends Component {
  state = {
    xml: '',
    env: 'wau',
    response: ''
  };

  onXmlChangeHandler = ({ target: { value } }) => {
    this.setState({ xml: value });
  };

  onEnvChangeHandler = ({ target: { value } }) => {
    this.setState({ env: value });
  };

  handleResponse = response => {
    this.setState({ response });
  };

  sendOrder = async () => {
    const sendOrderUrl = `${ORDER_DATA_URL_BASE_PATH}/goUtil/sendOrder`;
    const response = await fetch(sendOrderUrl, {
      ...postOptions,
      body: JSON.stringify({ xml: this.state.xml, env: this.state.env })
    });
    const responseText = await response.text();
    this.handleResponse(responseText);
  };

  render() {
    return (
      <div className={styles.goUtilityForm}>
        <div className={styles.goUtilityForm}>
          <label>GO ENVIRONMENT:</label>
          <span />
          <select
            id="go-environment"
            value={this.state.env}
            onChange={this.onEnvChangeHandler}
          >
            <option key={'int'} value={'int'}>
              INT
            </option>
            <option key={'wau'} value={'wau'}>
              WAU
            </option>
          </select>
        </div>

        <div />
        <div className={`${styles.goUtilityForm} ${styles.goUtility}`}>
          <div>
            <label>XML BODY:</label>
          </div>
          <textarea
            id="xml"
            value={this.state.xml}
            placeholder="XML Request Body"
            onChange={this.onXmlChangeHandler}
            onPaste={this.onKeyUp}
          />
        </div>

        <div className={styles.goUtilityForm}>
          <Button
            primary
            id="send-order"
            type="submit"
            onClick={this.sendOrder}
          >
            Send Order
          </Button>
        </div>

        <div className={`${styles.goUtilityForm} ${styles.goUtility}`}>
          <div>
            <label>XML RESPONSE:</label>
          </div>
          <textarea id="xml-response" value={this.state.response} readOnly />
        </div>
      </div>
    );
  }
}

export default GoUtility;
