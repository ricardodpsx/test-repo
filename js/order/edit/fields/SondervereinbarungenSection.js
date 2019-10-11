import React, { Component } from 'react';
import { H3, H4 } from '@otr/typography';
import Modal from '@otr/modal';
import messages from '../../../messages/messages';
import styles from './SondervereinbarungenSection.css';
import orderDataFormStyles from '../OrderDataForm.css';
import Sondervereinbarungen from './Sondervereinbarungen';

class SondervereinbarungenSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    function constructTextModules(textModules) {
      return messages.get(textModules).map(textModule => (
        <p>
          <div className={styles.textModuleTitle}>{textModule.title}</div>
          {textModule.content}
        </p>
      ));
    }

    const constructModal = () => (
      <Modal
        id="textModuleModal"
        className={styles.textModulesModal}
        size="large"
        isOpen={this.state.modalIsOpen}
        headerText={messages.get('text_modules')}
        onRequestClose={this.closeModal}
      >
        <p>
          {messages.get('text_modules_instructions')}
          <div>{messages.get('text_modules_instructions_2')}</div>
        </p>
        <H4>{messages.get('text_modules_timespan_sale')}</H4>
        {constructTextModules('text_modules_sentences_block_one')}
        <hr />
        <H4>{messages.get('text_modules_timespan_first_registration')}</H4>
        {constructTextModules('text_modules_sentences_block_two')}
      </Modal>
    );

    return (
      <div>
        {constructModal()}
        <H3>{messages.get('Sondervereinbarungen')}</H3>
        <p className={styles.textModule}>
          {messages.get('sondervereinbarungen_text_module')}
          <a
            className={styles.textModuleLink}
            id="sondervereinbarung_text_modules_modal_link"
            onClick={this.openModal}
          >
            {messages.get('sondervereinbarungen_choose_text_module')}
          </a>
          {messages.get('dot')}
        </p>
        <div
          className={`${styles.sondervereinbarungen} ${orderDataFormStyles.blueBox}`}
        >
          <Sondervereinbarungen />
        </div>
      </div>
    );
  }
}

export default SondervereinbarungenSection;
