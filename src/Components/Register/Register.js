import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AccountForm.css';

import { register } from '../../actions';

const mapStateToProps = state => {
  return {
    isPending: state.account.isPending,
    error: state.account.error,
    email: state.account.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOnSubmit: (email, password) => dispatch(register(email, password))
  }
}

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      registerEmail: '',
      password: '',
      repeatPassword: '',
      passwordsMatching: true
    }
  }
  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onPasswordRepeatChange = (event) => {
    this.setState({repeatPassword: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.repeatPassword) {
      this.setState({ passwordsMatching: false })
      return;
    }
    this.props.handleOnSubmit(this.state.registerEmail, this.state.password)
    this.props.getTodos(); 
  }
  render() {
    return(
      <div className='accountForm'>
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <label htmlFor="email-address">e-mail</label>
          <input
            onChange={this.onEmailChange}
            type="email"
            name="email-address"
            placeholder='johndoe@gmail.com'
          />
          <label htmlFor="password">password</label>
          <input
            onChange={this.onPasswordChange}
            type="password"
            name="password"
            placeholder='Secret1234'
          />
          <label htmlFor="repeat password">repeat password</label>
          <input
            onChange={this.onPasswordRepeatChange}
            type="password"
            name="repeatpassword"
            placeholder='Secret1234'
          />
          <input
            type="submit"
            value={this.props.isPending ? 'Loading...' : this.state.passwordsMatching ? 'Register' : "Passwords Don't Match"}
            className='accountButton'
          />
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
