import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AccountForm.css';

import { signIn } from '../../actions';

const mapStateToProps = state => {
  return {
    isPending: state.account.isPending,
    error: state.account.error,
    email: state.account.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleOnSubmit: (email, password) => dispatch(signIn(email, password))
  }
}

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleOnSubmit(this.state.signInEmail, this.state.signInPassword)
    this.props.getTodos(); 
  }
  render() {
    return(
      <div className='accountForm'>
        <h3>Sign In</h3>
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
            id="password"
            placeholder='Secret1234'
          />
          <input
            type="submit"
            value={this.props.isPending ? 'Loading...' : 'Sign In'}
            className='accountButton'
          />
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
