import * as userActions from '../actions/userActions'

const initialState = {
    userEmail: "",
    userId: "",
    authenticated: false,
    authToken: "",
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case userActions.LOAD_CURRENT_USER: 
            return {
                ...state,
                userEmail: action.userEmail,
                userId: action.userId
            }
        
            
        case userActions.SET_AUTHENTICATED: 
            return {
                ...state,
                authenticated: action.authenticated
            }
        
            
        case userActions.SET_AUTH_TOKEN: 
            return {
                ...state,
                authToken: action.token
            }

            
        default: return state
    } 
}

export default reducer;