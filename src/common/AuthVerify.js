import React from "react";
import { withRouter } from "react-router-dom";
import * as actions from '../reduxFolder/action/auth'
import { connect } from 'react-redux'



const AuthVerify = (props) => {
    props.history.listen(() => {
        
        if (props.loginProps.token) {

            if (props.loginProps.expirationDateForAccess * 1000 < Date.now()) {
                console.log('invalid access')
                
                if (props.loginProps.expirationDateForRefresh * 1000 < Date.now()) {

                    props.onAuthLogout()
                } else {
                    props.onAuthRefresh(props.loginProps.refreshToken);
                    console.log(props.loginProps)
                }

            }
        }
    });

    return <div></div>;
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token,
        loginProps: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthRefresh: (refreshToken) => dispatch(actions.refreshAuthUser(refreshToken)),
        onAuthLogout: () => dispatch(actions.authLogout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthVerify));