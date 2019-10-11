import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@otr/core-button';
import { Footer } from '@otr/modal';
import { connect } from 'react-redux';
import styles from './DocumentSelection.css';
import actionTypes from '../../../actionTypes';
import { printOrder } from '../../../actionCreators';
import * as optionsModel from '../printingOptionsModel';
import Section from './Section';
import { ACTIONS } from '../constants';
import messages from '../../../messages/messages';

class DocumentSelection extends Component {
  componentDidMount() {
    this.props.loadPricingData(
      this.props.dealId,
      this.props.isChangeOrder,
      this.props.customerType
    );
    this.props.openModalWithDefaults(this.props.customerType);
  }

  render() {
    return (
      <div className={styles.formSection}>
        {this.props.printingOptions.map(section => (
          <Section
            {...section}
            key={section.header.value}
            onChange={this.props.selectOption}
            customerType={this.props.customerType}
            isChangeOrder={this.props.isChangeOrder}
          />
        ))}
        <Footer>
          <Button
            secondary
            type="reset"
            onClick={this.props.hideModal}
            id="cancel-print-button"
          >
            {messages.get('cancel')}
          </Button>
          <Button
            key="printButton"
            className="modal-print-button"
            onClick={() =>
              this.props.print(
                this.props.selectedOptions,
                this.props.isChangeOrder
              )
            }
            type="submit"
          >
            {messages.get(this.props.printText)}
          </Button>
        </Footer>
      </div>
    );
  }
}

DocumentSelection.defaultProps = {
  onChange: () => {}
};

DocumentSelection.propTypes = {
  hideModal: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  printingOptions: PropTypes.array.isRequired,
  dealId: PropTypes.string.isRequired,
  customerType: PropTypes.string.isRequired,
  selectOption: PropTypes.func.isRequired,
  loadPricingData: PropTypes.func.isRequired,
  print: PropTypes.func.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  openModalWithDefaults: PropTypes.func.isRequired,
  printText: PropTypes.string.isRequired,
  isChangeOrder: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch, { dealId }) => ({
  openModalWithDefaults: customerType => {
    dispatch({ type: ACTIONS.DEFAULT_OPTIONS, customerType });
  },
  selectOption: (name, value, customerType) => {
    dispatch({ name, value, customerType, type: ACTIONS.SET_OPTION });
  },
  loadPricingData: (aDealId, isChangeOrder, customerType) => {
    dispatch({
      type: actionTypes.LOAD_PRICING_DATA,
      dealId,
      isChangeOrder,
      customerType
    });
  },
  print: (selectedOptions, isChangeOrder) => {
    dispatch(printOrder(dealId, selectedOptions, isChangeOrder));
  }
});

const mapStateToProps = (
  {
    order: {
      printingOptions,
      form: {
        data: { isOwnRetailer }
      }
    }
  },
  { isChangeOrder }
) => ({
  printingOptions: optionsModel.printingOptions(printingOptions, {
    isChangeOrder,
    isOwnRetailer
  }),
  selectedOptions: optionsModel.selectedOptions(
    optionsModel.printingOptions(printingOptions, {
      isChangeOrder,
      isOwnRetailer
    })
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentSelection);
