import UserActionTypes from './user.types';
const INITIAL_STATE = {
    currentUser: null, 
    error: null, 
    connectingToServer: false,
	isSubmittingLogin: false,
	isSubmittingRegister: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case UserActionTypes.CONNECTING_TO_SERVER: 
        return {
            ...state, 
            connectingToServer: action.payload
        };
    case UserActionTypes.SIGN_IN_SUCCESS: 
        return {
            ...state, 
            currentUser: action.payload, 
            error: null
        };
    case UserActionTypes.TOGGLE_SUBMITTING_REGISTER:
        return {
            ...state,
            isSubmittingRegister: action.payload,
        };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE: 
    case UserActionTypes.SIGN_OUT_FAILURE: 
       return {
           ...state, 
           currentUser: null, 
           error: action.payload
        }; 
    case UserActionTypes.TOGGLE_SUBMITTING_LOGIN:
        return {
            ...state,
            isSubmittingLogin: action.payload,
        };
    default: 
        return state; 
    }
}

export default userReducer