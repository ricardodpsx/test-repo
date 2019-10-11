import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@otr/core-button';
import styles from './preview/Order.css';
import OrderPrintButton from './printing/OrderPrinting';
import messages from '../messages/messages';
import { sendOrder } from '../actionCreators';
import ORDER_STATES from './OrderStates';

export function OrderStatusText({ orderStatus: { state, date } }) {
  const isOrderSentToGo = state === ORDER_STATES.OrderDataSent;

  return (
    isOrderSentToGo && (
      <div className={styles.orderStatus} id="order-sent-status-text">
        {messages.get('order_sent_status_text')(date)}
      </div>
    )
  );
}

OrderStatusText.propTypes = {
  orderStatus: PropTypes.object
};

OrderStatusText.defaultProps = {
  orderStatus: { state: '', date: null }
};

function OrderSendButton(props) {
  return (
    <Button
      primary
      id="send-order"
      type="submit"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.disabled
        ? messages.get('sending_to_GO')
        : messages.get('send_order')}
    </Button>
  );
}

OrderSendButton.defaultProps = {
  disabled: false
};

OrderSendButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

class OrderOptions extends Component {
  render() {
    const {
      dealId,
      doSendOrder,
      customerType,
      order: { status: { state } = {}, requestInProgress = false }
    } = this.props;

    const isOrderSentToGo = state === ORDER_STATES.OrderDataSent;

    return [
      <OrderPrintButton
        key="orderPrintButton"
        dealId={dealId}
        customerType={customerType}
        isChangeOrder={isOrderSentToGo}
      />,
      !isOrderSentToGo && (
        <OrderSendButton
          key="orderSendButton"
          id="order-send-button"
          onClick={() => doSendOrder(dealId)}
          disabled={requestInProgress}
        />
      )
    ];
  }
}

OrderOptions.propTypes = {
  dealId: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  doSendOrder: PropTypes.func.isRequired,
  customerType: PropTypes.string.isRequired
};

const mapStateToProps = ({ order }) => ({
  order: order.order
});

const mapDispatchToProps = dispatch => ({
  doSendOrder: dealId => dispatch(sendOrder(dealId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderOptions);
