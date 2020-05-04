export const LOAD_CURRENT_USER = "LOAD_CURRENT_USER"
export const SET_AUTHENTICATED = "SET_AUTHENTICATED"
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN"

export const loadCurrentUser = (email, id) => {
    //user email, id
    return {
        type: LOAD_CURRENT_USER,
        userEmail: email,
        userId: id
    }
}

export const setAuthenticated = (isAuth) => {
    //boolean 
    return {
        type: SET_AUTHENTICATED,
        authenticated: isAuth
    }
}

export const setAuthToken = (authToken) => {
    //token
    return {
        type: SET_AUTH_TOKEN,
        token: authToken
    }
}