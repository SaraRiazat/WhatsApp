
import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Global } from "@emotion/core";
import '../styles/_styles.scss';
import CustomForm from '../view/CustomForm';
import CustomButton from '../view/CustomButton';
import { Redirect , Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { COMETCHAT_CONSTANTS } from '../consts';
import * as actions from '../store/action';

class LogIn extends React.PureComponent {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  login = (uid) => {

    if (!uid) {
      uid = this.myRef.current.value;
      console.log(this.myRef.current.value)
    }

    this.uid = uid;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
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
      authRedirect = <Redirect to="/" />
    }

    return (
      <React.Fragment>
        <div>
          {authRedirect}
          {loader}
        </div>
        <div className='sign-in'>
          <span></span>
          <form>
            <div className="signin-section">
              <div className="signin-img">
                <img className="whatsapp-img" src="signinIcon.png"></img>
              </div>
              <div className='input-section'>
                <div className="group">
                  <input
                    name='name'
                    type='email'
                    className="form-input"
                    placeholder='Name'
                    required
                    handleChange={this.handleChange}
                  />
                </div>
                <div className="group">
                  <input
                    ref={this.myRef}
                    name='userid'
                    type='text'
                    className="form-input"
                    placeholder='User Id'
                    required
                    handleChange={this.handleChange}
                  />
                </div>
                <div className='buttons'>
                  <CustomButton
                    onClick={() => this.login()}
                  >
                    Sign In
                  </CustomButton>
                  <Link to="/signup">
                    <p className='text-Link'>you don't have account? Sign in</p>
                  </Link>
                  <p className='text-error'>{errorMessage}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
