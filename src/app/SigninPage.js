import React from 'react';
import '../styles/_styles.scss';
import CustomForm from '../view/CustomForm';
import CustomButton from '../view/CustomButton';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'

import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { COMETCHAT_CONSTANTS } from '../consts';
import { CometChat } from "@cometchat-pro/chat";
import * as actions from '../store/action';



class SignIn
  extends React.PureComponent {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      name: '',
      userid: '',
      password: '',
    }
  }
  handleSubmit = event => {
    event.preventDefault()

    this.setState({ name: '', userid: '' })
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }


  login = (uid) => {

    if (!uid) {
      uid = this.myRef.current;
    }
    this.uid = uid;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
    let authKey = "03ae3a8e24d687ee3b7f26d2f3b8512008f3dd9a";
    var user = new CometChat.User(this.state.userid);
    user.setName(this.state.name);
    CometChat.createUser(user, authKey).then(
      user => {
        console.log("user created", user);
      }, error => {
        console.log("error", error);
      }
    )
  }

  render() {

    let loader = null;
    if (this.props.loading) {
      loader = (<div className="loading">Loading...</div>);
    }


    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if (this.props.isLoggedIn) {
      authRedirect = <BrowserRouter to="/" />
    }

    return (
      <React.Fragment>
        {console.log(loader)}
        {authRedirect}
        {loader}
        {errorMessage}
        <div className='sign-in'>
          <span></span>
          <form onSubmit={this.handleSubmit}>
            <div className="signin-section">
              <div className="signin-img">
                <img className="whatsapp-img" src="signinIcon.png"></img>
              </div>
              <div>
                <CustomForm
                  name='name'
                  type='email'
                  value={this.state.name}
                  required
                  label={'name'}
                  handleChange={this.handleChange}
                />
                <CustomForm
                  ref={this.myRef}
                  name='userid'
                  type='text'
                  value={this.state.userid}
                  required
                  label={'UserId'}
                  handleChange={this.handleChange}
                />
                <CustomForm
                  ref={this.myRef}
                  name='password'
                  type='password'
                  value={this.state.userid}
                  required
                  label={'Password'}
                  handleChange={this.handleChange}
                />
                <div className='buttons'>
                  <CustomButton
                    onClick={() => this.login()}
                  >
                    Sign In
                  </CustomButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (uid, authKey) => dispatch(actions.auth(uid, authKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
