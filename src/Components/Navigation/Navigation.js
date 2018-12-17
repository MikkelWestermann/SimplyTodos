import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Navigation.css';

import { accountRoute, signOut, wipeTodos } from '../../actions';

const mapStateToProps = state => {
  return {
    isSignedIn: state.account.isSignedIn,
    accountRoute: state.accountRoute.route,
    email: state.account.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAccountForm: route => {dispatch(accountRoute(route))},
    handleSignOut: () => {dispatch(signOut())},
    wipeTodos: () => {dispatch(wipeTodos())}
  }
}

class Navigation extends Component {
  render() {
    if (this.props.isSignedIn) {
      return (
        <nav>
          <p>Signed In As: {this.props.email}</p>
          <p onClick={() => {
            this.props.handleSignOut()
            this.props.handleAccountForm('')
            this.props.wipeTodos()
          }}>Sign Out</p>
        </nav>
      )
    } else {
      if (this.props.accountRoute !== '') {
        return (
          <nav>
            <p onClick={() => this.props.handleAccountForm('')}>Click Here To Close</p>
          </nav>
        )
      } else {
        return (
          <nav>
            <p onClick={() => this.props.handleAccountForm('signin')}>Sign In</p>
            <p onClick={() => this.props.handleAccountForm('register')}>Register</p>
          </nav>
        )
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
