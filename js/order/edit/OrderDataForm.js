import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@otr/core-button';
import { PanesContainer, RightPane } from '@otr/action-footer';
import VBETNumber from './fields/VBETNumber';
import { OrderDate } from './fields/OrderDate';
import FrozenOrderDate from './fields/FrozenOrderDate';
import DeliveryDate from './fields/DeliveryDate';
import VehiclePaperDestination from './fields/VehiclePaperDestination';
import {
  goToDealPicker,
  loadOrderStatus,
  saveAndPreviewOrderData
} from '../../actionCreators';
import CustomerDataReview from './customerDataReview/CustomerDataReview';
import messages from '../../messages/messages';
import CloseButton from '../../UIComponents/CloseButton';
import Page from '../Page';
import styles from './OrderDataForm.css';
import AgreedDeliveryDate from './fields/AgreedDeliveryDate';
import SondervereinbarungenSection from './fields/SondervereinbarungenSection';
import ORDER_STATES from '../OrderStates';
import CustomerRequestDate from './fields/CustomerRequestDate';
import BusinessCustomerDataReview from './businessCustomerDataReview/BusinessCustomerDataReview';
import SalesCommunityDataReview from './salesCommunityDataReview/SalesCommunityDataReview';
import FremdLeasing from './fremdleasing/FremdLeasing';

class OrderDataForm extends Component {
  static propTypes = {
    dealId: PropTypes.string.isRequired,
    saveAndPreviewOrderData: PropTypes.func.isRequired,
    goToDealPicker: PropTypes.func.isRequired,
    doLoadOrderStatus: PropTypes.func.isRequired,
    isStockVehicle: PropTypes.bool,
    isOwnRetailer: PropTypes.bool,
    featureToggles: PropTypes.object,
    customerType: PropTypes.string.isRequired,
    isSentToGo: PropTypes.bool
  };

  static defaultProps = {
    isStockVehicle: false,
    isOwnRetailer: true,
    isSentToGo: false,
    featureToggles: {}
  };

  componentDidMount() {
    this.props.doLoadOrderStatus(this.props.dealId);
  }

  onSaveAndPreviewHandler = () => {
    this.props.saveAndPreviewOrderData(this.props.dealId);
  };

  onCloseHandler = () => {
    this.props.goToDealPicker();
  };

  shouldRenderSalesCommunityDataReview = () => {
    return (
      this.props.featureToggles.SALES_COMMUNITY_TOGGLE &&
      this.props.isOwnRetailer
    );
  };

  renderAdditionalDates = () =>
    this.props.isStockVehicle ? (
      <AgreedDeliveryDate />
    ) : (
      <CustomerRequestDate />
    );

  renderSondervereinbarungen = () => {
    return this.props.isOwnRetailer ? <SondervereinbarungenSection /> : null;
  };

  render() {
    return (
      <Page>
        <CloseButton onClick={this.onCloseHandler} />
        <h1>{messages.get('order_data_completion')}</h1>
        <section className={styles.contractualDataSection}>
          <div>
            <h3>{messages.get('general_contract_data')}</h3>
            <div className={styles.blueBox}>
              <div className={styles.oneHalf}>
                {this.props.isSentToGo ? <FrozenOrderDate /> : <OrderDate />}
              </div>

              <div className={styles.vehiclePaperDestination}>
                <VehiclePaperDestination />
              </div>
            </div>
          </div>
          <hr />
          <div>
            <h3>{messages.get('Termindaten')}</h3>
            <div className={styles.blueBox}>
              <div className={styles.oneHalf}>
                <DeliveryDate />
              </div>
              <div className={styles.dateRangePicker}>
                {this.renderAdditionalDates()}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.contractualDataSection}>
          <div>{this.renderSondervereinbarungen()}</div>
        </section>
        {this.props.featureToggles.FREMD_LEASING_TOGGLE && <FremdLeasing />}
        {this.props.customerType === 'company' ? (
          <BusinessCustomerDataReview />
        ) : (
          <CustomerDataReview />
        )}
        <section className={styles.contractualDataSection}>
          <div>
            <h3>{messages.get('further_data')}</h3>
            <div className={styles.blueBox}>
              <div className={styles.oneHalf}>
                <VBETNumber />
              </div>
            </div>
          </div>
          <hr />
          <div />
        </section>
        {this.shouldRenderSalesCommunityDataReview() && (
          <SalesCommunityDataReview />
        )}
        <PanesContainer>
          <RightPane>
            <Button
              primary
              id="save-and-continue"
              type="submit"
              onClick={this.onSaveAndPreviewHandler}
            >
              {messages.get('save_and_continue')}
            </Button>
          </RightPane>
        </PanesContainer>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveAndPreviewOrderData: dealId => dispatch(saveAndPreviewOrderData(dealId)),
  goToDealPicker: () => dispatch(goToDealPicker()),
  doLoadOrderStatus: dealId => dispatch(loadOrderStatus(dealId))
});

const mapStateToProps = state => ({
  isSentToGo: state.order.order.status.state === ORDER_STATES.OrderDataSent,
  isStockVehicle: state.order.form.data.isStockVehicle,
  isOwnRetailer: state.order.form.data.isOwnRetailer,
  featureToggles: state.order.toggles,
  customerType: state.order.form.data.customer.customerType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDataForm);
