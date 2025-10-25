import * as types from './types';
import axios from 'axios'
import ApiURL from '../../jsonFiles/api/api.json'
import jwt_decode from "jwt-decode";

export const authStart = () => {
    return {
        type: types.AUTH_START,
    }
};

export const authSuccess = (accessToken, refreshToken) => {
    return {
        type: types.AUTH_SUCCESS,
        token: accessToken,
        refreshToken: refreshToken
    };
};

export const authFail = (error) => {
    return {
        type: types.AUTH_FAIL,
        error: error
    };
};


export const authLogout = () => {
    redirectPage("/signin");
    return {
        type: types.AUTH_LOGOUT,
    };
};

export const setUserInfo = (userType, userName) => {
    return {
        type: types.SET_USER_INFO,
        userType: userType,
        userName: userName
    };
};




export const setAccessExpirationDate = (expirationDateForAccess) => {
    // const date1 = new Date(0);
    // date1.setUTCSeconds(expirationDateForAccess);
    return {
        type: types.SET_ACCESS_EXPIRATION_DATE,
        expirationDateForAccess: expirationDateForAccess,
    };
};

export const setRefreshExpirationDate = (expirationDateForRefresh) => {
    // const date2 = new Date(0);
    // date2.setUTCSeconds(expirationDateForRefresh);
    return {
        type: types.SET_REFRESH_EXPIRATION_DATE,
        expirationDateForRefresh: expirationDateForRefresh
    };
};

export const getToken = () => {
    return (dispatch) => {
        dispatch({ type: types.GET_TOKEN })
    }
}



export const checkAuthTimeout = (expireationTime, accessToken, refreshToken) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(refreshAuthUser( refreshToken));
        }, expireationTime);
    };
};

export const refreshPage = () => {
    window.location.reload();
};

export const redirectPage = (url) => {
    window.location = url;
};

export const authUser = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            username: username,
            password: password
        };
        axios.post(`${ApiURL.domain}${ApiURL.login}`, data)
            .then(response => {
                dispatch(setUserInfo("user", "user"))

                let accessDecodedToken = jwt_decode(response.data.access)
                let refreshDecodedToken = jwt_decode(response.data.refresh)

                dispatch(setAccessExpirationDate(accessDecodedToken.exp))
                dispatch(setRefreshExpirationDate(refreshDecodedToken.exp))
                dispatch(authSuccess(response.data.access, response.data.refresh))

                if (accessDecodedToken.admin === true) {
                    dispatch(setUserInfo("admin", "admin"))
                    dispatch(redirectPage("/admin/"))
                }
                else if (accessDecodedToken.employee === true) {
                    dispatch(setUserInfo("employee", "employee"))
                    const token = 'Bearer '.concat(response.data.access);
                    axios.get(`${ApiURL.domain}${ApiURL.myUser}`, { "headers": { Authorization: token } }).then(
                        response => {
                            dispatch(setUserInfo("employee", response.data.fullName))
                            dispatch(redirectPage("/profile"))
                        }).catch(err => { dispatch(redirectPage("/")) })
                }
                else {
                    dispatch(setUserInfo("user", "user"))
                    const token = 'Bearer '.concat(response.data.access);
                    axios.get(`${ApiURL.domain}${ApiURL.myUser}`, { "headers": { Authorization: token } }).then(
                        response => {
                            dispatch(setUserInfo("user", response.data.fullName))
                            dispatch(redirectPage("/profile"))
                        }).catch(err => { dispatch(redirectPage("/")) })
                }

                // dispatch(checkAuthTimeout("10000",response.data.access, response.data.refresh ))


            }).catch(err => {
                console.log(err)
                if (err.request) {
                    let errors = JSON.parse(err.request.responseText)
                    Object.keys(errors).map(function (keyName, keyIndex) {
                        return (<>

                            {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                        </>)
                    })
                }
                dispatch(authFail(err.message))
            })
    };
};

export const refreshAuthUser = (refreshToken) => {
    return dispatch => {
        console.log("start refresh")

        dispatch(authStart());

        const data = {
            refresh: refreshToken,
        };
        axios.post(`${ApiURL.domain}${ApiURL.loginRefresh}`, data)
            .then(response => {
                dispatch(setUserInfo("user", "user"))

                let accessDecodedToken = jwt_decode(response.data.access)

                dispatch(setAccessExpirationDate(accessDecodedToken.exp))
                dispatch(authSuccess(response.data.access, refreshToken))

                if (accessDecodedToken.admin === true) {
                    dispatch(setUserInfo("admin", "admin"))
                }
                else if (accessDecodedToken.employee === true) {
                    dispatch(setUserInfo("employee", "user"))
                    const token = 'Bearer '.concat(response.data.access);
                    axios.get(`${ApiURL.domain}${ApiURL.myUser}`, { "headers": { Authorization: token } }).then(
                        response => {
                            dispatch(setUserInfo("employee", response.data.fullName))
                        }).catch(err => { })
                }
                else {
                    dispatch(setUserInfo("user", "user"))
                    const token = 'Bearer '.concat(response.data.access);
                    axios.get(`${ApiURL.domain}${ApiURL.myUser}`, { "headers": { Authorization: token } }).then(
                        response => {
                            dispatch(setUserInfo("user", response.data.fullName))
                        }).catch(err => { })
                }

                // dispatch(checkAuthTimeout("10000",response.data.access, response.data.refresh ))

            }).catch(err => {
                dispatch(authFail(err.message))
            })
    };
};