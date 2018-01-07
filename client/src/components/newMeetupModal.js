import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export default class NewMeetupModal extends Component {
  constructor() {
    super();
    this.state = {
      formControlsEventName: '',
      formControlsPlace: '',
      formControlsCapacity: 0,
      formControlsMinFee: 0,
      formControlsDate: '',
      formControlsTime: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.FieldGroup = this.FieldGroup.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id} validationState={this.getValidationState(id)} >
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} onChange={this.handleChange} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  
  getValidationState(id) {
    let length = 0;
    let isValid = false;
    let val = 0;
    switch (id) {
    case 'formControlsEventName':
      length = this.state.formControlsEventName.length;
      isValid = length > 0 && length < 128;
      return this.validateTerm(isValid);
    case 'formControlsPlace':
      length = this.state.formControlsPlace.length;
      isValid = length > 0 && length < 128;
      return this.validateTerm(isValid);
    case 'formControlsCapacity':
      val = this.state.formControlsCapacity;
      isValid = val > 0 && !isNaN(parseFloat(val)) && isFinite(val);
      return this.validateTerm(isValid);
    case 'formControlsMinFee':
      val = this.state.formControlsMinFee;
      isValid = val > 0 && !isNaN(parseFloat(val)) && isFinite(val);
      return this.validateTerm(isValid);
    case 'formControlsDate':
      val = this.state.formControlsDate;
      isValid = val !== '';
      return this.validateTerm(isValid);
    case 'formControlsTime':
      val = this.state.formControlsTime;
      isValid = val !== '';
      return this.validateTerm(isValid);
    default:
      return this.validateTerm(false);
    }
  }
  
  validateTerm(isValid) {
    if (isValid) return 'success';
    //else if (length > 5) return 'warning';
    else return 'error';
  }  

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.toggleNewMeetupModalIsOpen}
        style={customStyles}
        closeTimeoutMS={150}
        contentLabel='NewMeetupModal'
        aria={{
          labelledby: 'heading',
          describedby: 'fulldescription'
        }}
      >
        <h1 id='heading'>New Meeup</h1>
        <div id='fulldescription' tabIndex='0' role='document'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <this.FieldGroup
              id='formControlsEventName'
              type='text'
              label='イベント名'
              placeholder='Ethereum meetup'
            />
            <this.FieldGroup
              id='formControlsPlace'
              type='text'
              label='開催地'
              placeholder='東京都文京区本郷７丁目３−１'
            />
            <this.FieldGroup 
              id='formControlsCapacity' 
              type='number'
              label='定員'
              placeholder='0' 
            />
            <this.FieldGroup
              id='formControlsMinFee'
              type='text'
              label='参加料金(ETH)'
              placeholder='0'
            />
            <this.FieldGroup
              id='formControlsDate'
              type='date'
              label='日付'
            />
            <this.FieldGroup
              id='formControlsTime'
              type='text'
              label='時刻'
              placeholder='20:00'
            />
            <Button className="btn btn-primary btn-large centerButton" type='submit'>作成</Button>
          </form>
        </div>
        <ToastContainer />
      </Modal>
    );
  }

  async handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    try {
      await this.props.newMeetup(
        this.state.formControlsEventName,
        this.state.formControlsPlace,
        this.state.formControlsDate,
        this.state.formControlsTime,
        this.state.formControlsMinFee,
        this.state.formControlsCapacity
      );
    } catch(e) {
      console.log(e);
      toast.error(e);
    }

    this.props.toggleNewMeetupModalIsOpen();
  }
  
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
}

const customStyles = {
  content : {
    width: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};