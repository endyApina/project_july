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

export const updateCurrentUser = (user) => ({
	type: UserActionTypes.UPDATE_CURRENT_USER, 
	payload: user
})

export const updateSignUpData = data => ({
	type: UserActionTypes.UPDATE_SIGNUP_DATA, 
	payload: data
})

export const toggleVerifiedUser = status => ({
	type: UserActionTypes.TOGGLE_VERIFIED_USER, 
	payload: status
})

export const toggleSubmittingRegister = status => ({
	type: UserActionTypes.TOGGLE_SUBMITTING_REGISTER,
	payload: status
});

export const toggleForgettingPassword = status => ({
	type: UserActionTypes.TOGGLE_SUBMITTING_FORGOT_PASSWORD,
	payload: status
});

export const toggleOTPStatus = (status, userData) => ({
	type: UserActionTypes.TOGGLE_OTP_STATUS, 
	payload: status, 
	userData: userData
})

export const toggleLoadOrders = status => ({
	type: UserActionTypes.LOAD_USER_ORDERS, 
	payload: status
})

export const toggleUserLoggedIn = status => ({
	type: UserActionTypes.TOGGLE_USER_LOGGED_IN,
	payload: status
});

export const signInFailure = user => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: user
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

export const startOTPVerification = verificationData => ({
	type: UserActionTypes.SEND_VERIFICATION_OTP, 
	payload: verificationData
})

export const signUpSuccess = (user, signUpData)  => ({
	type: UserActionTypes.SIGN_UP_SUCCESS,
	payload: user, 
	data: signUpData,
});

export const signUpFailure = error => ({
	type: UserActionTypes.SIGN_UP_FAILURE,
	payload: error
});

export const connectingToServer = status => ({
	type: UserActionTypes.CONNECTING_TO_SERVER,
	payload: status
});