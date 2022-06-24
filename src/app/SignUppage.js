import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import '../styles/_styles.scss';
import CustomForm from '../view/CustomForm';
import CustomButton from '../view/CustomButton';
import { jsx } from '@emotion/core'
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { COMETCHAT_CONSTANTS } from '../consts';
import { CometChat } from "@cometchat-pro/chat";
import * as actions from '../store/action';



class SignUp
    extends React.PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            name: '',
            userid: '',
            password: '',
            create: '',
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
    signup = (uid) => {

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
                this.setState({ create: "User created successfully. Please login" })
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
                {authRedirect}
                {loader}
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
                                <div className='buttons'>
                                    <CustomButton
                                        onClick={() => this.signup()}
                                    >
                                        Sign In
                                    </CustomButton>
                                </div>
                                <Link to="/login">
                                    <p className='text-Link'>you have account? Login</p>
                                </Link>
                                <p className='text-successfully'>{this.state.create}</p>
                                <p className='text-error'>{errorMessage}</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);