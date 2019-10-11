import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@otr/core-button';
import PropTypes from 'prop-types';
import Modal from '@otr/modal';
import messages from '../../messages/messages';
import DocumentSelection from './printingOptions/DocumentSelection';

function printButton(onPrintOrderClick) {
  return (
    <span key="orderPrintButton">
      <Button
        id="print-button"
        secondary
        type="submit"
        onClick={onPrintOrderClick}
      >
        {messages.get('print')}
      </Button>
    </span>
  );
}

function changeOrderButton(onPrintChangeOrderClick) {
  return (
    <Button
      id="change-order-print-button"
      secondary={false}
      type="submit"
      onClick={onPrintChangeOrderClick}
    >
      {messages.get('print_change_order')}
    </Button>
  );
}

function printingOptions(
  modalIsOpen,
  changeOrderIsClicked,
  modalOpened,
  dealId,
  customerType
) {
  return (
    <span id="order-printing">
      <Modal
        size="large"
        isOpen={modalIsOpen}
        headerText={
          changeOrderIsClicked
            ? messages.get('compile_change_order_document')
            : messages.get('compile_order_document')
        }
        onRequestClose={() => modalOpened(false)}
      >
        <div className="printing-options">
          <DocumentSelection
            dealId={dealId}
            customerType={customerType}
            hideModal={() => modalOpened(false)}
            printText={changeOrderIsClicked ? 'print_change_order' : 'print'}
            isChangeOrder={changeOrderIsClicked}
          />
        </div>
      </Modal>
    </span>
  );
}

function OrderPrinting({ dealId, customerType, isChangeOrder }) {
  const [modalIsOpen, modalOpened] = useState(false);
  const [changeOrderIsClicked, changeOrderClicked] = useState(false);

  const onPrintOrderClick = () => {
    changeOrderClicked(false);
    modalOpened(true);
  };
  const onPrintChangeOrderClick = () => {
    changeOrderClicked(true);
    modalOpened(true);
  };

  return [
    printingOptions(
      modalIsOpen,
      changeOrderIsClicked,
      modalOpened,
      dealId,
      customerType
    ),
    printButton(onPrintOrderClick),
    isChangeOrder && changeOrderButton(onPrintChangeOrderClick)
  ];
}

OrderPrinting.propTypes = {
  dealId: PropTypes.string.isRequired,
  customerType: PropTypes.string.isRequired,
  isChangeOrder: PropTypes.bool
};

OrderPrinting.defaultProps = {
  isChangeOrder: false
};

export default connect()(OrderPrinting);
