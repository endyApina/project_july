import UserActionTypes from './user.types';

export const emailSignInStart = emailAndPassword => ({
	type: UserActionTypes.SIGN_IN_START,
	payload: emailAndPassword
})

export const otpVerificationStart = phoneNumber => ({
	type: UserActionTypes.OTP_VERIFICATION_START, 
	payload: phoneNumber
})

export const startForgetPassword = email => ({
	type: UserActionTypes.FORGET_PASSWORD_START,
	payload: email
})

export const signInSuccess = user => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user
});

export const toggleSubmittingLogin = status => ({
	type: UserActionTypes.TOGGLE_SUBMITTING_LOGIN,
	payload: status
});

export const toggleSubmittingRegister = status => ({
	type: UserActionTypes.TOGGLE_SUBMITTING_REGISTER,
	payload: status
});

export const toggleForgettingPassword = status => ({
	type: UserActionTypes.TOGGLE_SUBMITTING_FORGOT_PASSWORD,
	payload: status
});

export const toggleUserLoggedIn = status => ({
	type: UserActionTypes.TOGGLE_USER_LOGGED_IN,
	payload: status
});

export const signInFailure = error => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: error
});

export const checkUserSession = () => ({
	type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
	type: UserActionTypes.SIGN_OUT_FAILURE,
	payload: error
});

export const signUpStart = userData => ({
	type: UserActionTypes.SIGN_UP_START,
	payload: userData
});

export const signUpSuccess = user  => ({
	type: UserActionTypes.SIGN_UP_SUCCESS,
	payload: user
});

export const signUpFailure = error => ({
	type: UserActionTypes.SIGN_UP_FAILURE,
	payload: error
});

export const connectingToServer = status => ({
	type: UserActionTypes.CONNECTING_TO_SERVER,
	payload: status
});