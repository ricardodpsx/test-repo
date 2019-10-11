import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@otr/core-button';
import { LeftPane, PanesContainer, RightPane } from '@otr/action-footer';
import CloseButton from '../../UIComponents/CloseButton';
import messages from '../../messages/messages';
import Page from '../Page';
import OrderSummary from './OrderSummary';
import orderService from './orderService';
import {
  goToDealPicker,
  goToEditPage,
  loadOrderStatus
} from '../../actionCreators';
import OrderOptions, { OrderStatusText } from '../OrderOptions';
import Banner from './Banner';

export class Order extends Component {
  static propTypes = {
    dealId: PropTypes.string.isRequired,
    goToDealPicker: PropTypes.func.isRequired,
    goToEditPage: PropTypes.func.isRequired,
    doLoadOrderStatus: PropTypes.func.isRequired,
    orderData: PropTypes.object.isRequired,
    featureToggles: PropTypes.object.isRequired,
    goBack: PropTypes.func,
    order: PropTypes.object.isRequired,
    isOwnRetailer: PropTypes.bool
  };

  static defaultProps = {
    goBack: undefined,
    isOwnRetailer: true
  };

  constructor(props) {
    super(props);
    this.state = {
      configurationMismatch: false,
      configurationDate: null,
      isBaumusterUnavailable: false
    };
  }

  // Todo: Discuss or use Sagas
  componentDidMount() {
    this.props.doLoadOrderStatus(this.props.dealId);
    orderService
      .timeBoundConfigurationInfo(this.props.dealId)
      .then(response => {
        this.setState(response);
      })
      .catch(() => {
        this.setState({ isBaumusterUnavailable: true });
      });
  }

  onBackToEditPageButtonClickHandler = () => {
    this.props.goToEditPage(this.props.dealId, this.props.goBack);
  };

  timeBoundConfigurationBanner() {
    let bannerText;

    if (this.state.isBaumusterUnavailable) {
      bannerText = (
        <span>
          {messages.get('baumuster_unavailable_warning')}{' '}
          <a href={`/#/konfigurator/deal/${this.props.dealId}/vehicle-details`}>
            {messages.get('go_to_konfigurator_vehicle_details')}
          </a>
        </span>
      );
    } else if (this.state.configurationMismatch) {
      bannerText = (
        <span>
          {messages.get('time_bound_configuration_warning')}{' '}
          <a href={`/#/konfigurator/deal/${this.props.dealId}/vehicle-details`}>
            {messages.get('go_to_konfigurator')}
          </a>
        </span>
      );
    }
    return bannerText ? <Banner text={bannerText} /> : null;
  }

  render() {
    return (
      <div>
        {this.timeBoundConfigurationBanner()}
        <Page>
          <CloseButton onClick={this.props.goToDealPicker} />
          <h1>{messages.get('order_summary')}</h1>
          <OrderStatusText orderStatus={this.props.order.status} />

          <OrderSummary
            data={this.props.orderData}
            featureToggles={this.props.featureToggles}
            isOwnRetailer={this.props.isOwnRetailer}
          />
          <PanesContainer>
            <RightPane>
              <OrderOptions
                dealId={this.props.dealId}
                customerType={this.props.orderData.customer.customerType}
              />
            </RightPane>

            <LeftPane>
              <Button
                secondary
                id="edit-order"
                type="reset"
                onClick={this.onBackToEditPageButtonClickHandler}
              >
                {messages.get('order_edit')}
              </Button>
            </LeftPane>
          </PanesContainer>
        </Page>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  goToDealPicker: () => dispatch(goToDealPicker()),
  goToEditPage: (dealId, goBack) => dispatch(goToEditPage(dealId, goBack)),
  doLoadOrderStatus: dealId => dispatch(loadOrderStatus(dealId))
});

const mapStateToProps = ({ order }) => ({
  orderData: order.form.data,
  featureToggles: order.toggles,
  order: order.order,
  isOwnRetailer: order.form.data.isOwnRetailer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
