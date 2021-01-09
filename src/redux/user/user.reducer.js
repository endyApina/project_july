import UserActionTypes from './user.types';
const INITIAL_STATE = {
    currentUser: null, 
    appUserData: null, 
    userLoggedIn: false, 
    error: null, 
    connectingToServer: false,
	isSubmittingLogin: false,
    isSubmittingRegister: false,
    isForgettingPassword: false,
    signUpSuccess: false,  
    verifiedUser: 0,
    signUpData: null,
    otpVerificationStatus: false, 
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
        return {
            ...state,
            appUserData: action.payload,
            isSubmittingLogin: false,
            isSubmittingRegister: false, 
            userLoggedIn: true, 
            error: null
        };
    case UserActionTypes.SIGN_UP_SUCCESS: 
        return {
            ...state, 
            currentUser: action.payload,
            signUpData: action.data,
            isSubmittingRegister: false, 
            signUpSuccess: true, 
            error: null
        }
    case UserActionTypes.CONNECTING_TO_SERVER: 
        return {
            ...state, 
            connectingToServer: action.payload
        };
    case UserActionTypes.TOGGLE_SUBMITTING_REGISTER:
        return {
            ...state,
            isSubmittingRegister: action.payload,
        };
    case UserActionTypes.TOGGLE_VERIFIED_USER: 
        return {
            ...state, 
            verifiedUser: action.payload
        }
    case UserActionTypes.TOGGLE_SUBMITTING_FORGOT_PASSWORD:
        return {
            ...state,
            isForgettingPassword: action.payload,
        };
    case UserActionTypes.TOGGLE_USER_LOGGED_IN:
        return {
            ...state,
            userLoggedIn: action.payload,
        };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE: 
        return {
            ...state, 
            currentUser: action.payload, 
            isSubmittingLogin: false, 
            userLoggedIn: false, 
            error: null
        }
    case UserActionTypes.SIGN_OUT_FAILURE: 
       return {
           ...state, 
           currentUser: null, 
           userLoggedIn: false, 
           error: action.payload
        }; 
    case UserActionTypes.TOGGLE_SUBMITTING_LOGIN:
        return {
            ...state,
            isSubmittingLogin: action.payload,
        };
    case UserActionTypes.UPDATE_CURRENT_USER: 
        return {
            ...state, 
            currentUser: action.payload
        }
    case UserActionTypes.TOGGLE_OTP_STATUS: 
        return {
            ...state, 
            otpVerificationStatus: action.payload
        }
    case UserActionTypes.UPDATE_SIGNUP_DATA: 
        return {
            ...state, 
            signUpData: action.payload
        }
    default: 
        return state; 
    }
}

export default userReducer