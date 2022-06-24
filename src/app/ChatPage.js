import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { connect } from "react-redux";
import * as actions from "../store/action";
import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/CometChatUI/index";

const ChatPage = (props) => {
    return (
        <>
            <CometChatUI/>
        </>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isLoggedIn: state.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);