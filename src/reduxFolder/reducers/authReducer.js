import * as actions from '../action/types'



const initialState = {
    token: null,
    refreshToken: null,
    error: null,
    loading: false,
    userType: null,
    userName: null,
    expirationDateForAccess: null,
    expirationDateForRefresh: null
}

const authReducer = (state = initialState, action) => {

    const authStart = (state, action) => {
        return { ...state, error: null, loading: true }
    }
    const authSuccess = (state, action) => {
        return { ...state, token: action.token, refreshToken: action.refreshToken, error: null, loading: false }
    }
    const authFail = (state, action) => {
        return { ...state, error: action.error, loading: false }
    }
    const authLogout = (state, action) => {
        return { ...state, token: null, refreshToken: null, userType: null, userName: null, expirationDateForAccess: null, expirationDateForRefresh: null }
    }
    const setUserInfo = (state, action) => {
        return { ...state, userType: action.userType, userName: action.userName }
    }
    const setAccessExpirationDate = (state, action) => {
        return { ...state, expirationDateForAccess: action.expirationDateForAccess }
    }
    const setRefreshExpirationDate = (state, action) => {
        return { ...state, expirationDateForRefresh: action.expirationDateForRefresh }
    }
    const getToken = (state, action) => {
        return { ...state }
    }


    switch (action.type) {

        case actions.AUTH_START:
            return authStart(state, action)

        case actions.AUTH_SUCCESS:
            return authSuccess(state, action)

        case actions.AUTH_FAIL:
            return authFail(state, action)

        case actions.AUTH_LOGOUT:
            return authLogout(state, action)

        case actions.SET_USER_INFO:
            return setUserInfo(state, action)

        case actions.SET_ACCESS_EXPIRATION_DATE:
            return setAccessExpirationDate(state, action)

        case actions.SET_REFRESH_EXPIRATION_DATE:
            return setRefreshExpirationDate(state, action)

        case actions.GET_TOKEN:
            return getToken(state, action)

        default:
            return state;
    }
}
export default authReducer;