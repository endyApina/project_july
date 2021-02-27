import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import axios from 'axios';
import { signUpSuccess, signInFailure, toggleSubmittingLogin, toggleSubmittingRegister, signInSuccess, toggleForgettingPassword, toggleVerifiedUser, signUpStart, updateCurrentUser, updateSignUpData, toggleOTPStatus } from './user.action';

import { emailSignUp, CALL_POST_API } from '../../util/user.util';
import { REG_API, LOGIN_API, FORGOT_PASSWORD_API, RESEND_OTP, VEIRFY_OTP } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* registration({payload: {body, code, message}}) {
    if (code != 200) {
        alert(message)
        return 
    }

    try {
        yield put(signUpSuccess(body))
        storeLogin(body)
    } catch(error) {
        console.log(error)
    }
} 

export function* signInAfterSignUp({payload: user}) {
    try {
        yield put(signInSuccess({user: user}))
    } catch (error) {
        console.log(error)
    }
}

export function* onSignUpSuccess() {
    yield takeLatest(
        console.log("sign up success"),
        UserActionTypes.SIGN_UP_SUCCESS, 
        signInAfterSignUp
    )
}

export function* onSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        registration
    )
}

const storeLogin = async (data) => {
    try {
        const jsonData = JSON.stringify(data)
        await AsyncStorage.setItem('user_data', jsonData)
    } catch (e) {
      // saving error
    }
}

export function* signUserIn({payload: {body, code, message}}) {
    try {
        storeLogin(body)
        yield put(signInSuccess(body))
    } catch(error) {
        console.log(error)
    }
}

export function* forgetPasswordStart({payload: email}) {
    const data ={
        email: email
    }
    try {
        yield put(toggleForgettingPassword(true))
        var response; 

        yield CALL_POST_API(data, FORGOT_PASSWORD_API).next().value.then(resp => {
            console.log(resp)
            if (resp.status) {
                alert(resp.message + "\n Please check your email.")
            }
        }).then(error => {
            console.log(error)
        })

        alert(response)
        yield put(toggleForgettingPassword(false))
    } catch (error) {
        //do something
    }
}

export function* sendOTPToken({payload: verificationData}) {
    console.log("send OTP")
    // var verificationStatus = false;
    yield put(toggleOTPStatus(true, verificationData))
}

export function* verifyOTP({payload: phoneNumber}) {
    console.log("Verify")
    const data = {
        phoneNumber: phoneNumber, 
        otpAction: "activate_account", 
        tokenId: "2"
    }

    try {
        yield CALL_POST_API(data, RESEND_OTP).next().value.then(resp => {
            console.log(resp)
            if (resp.data) {
                console.log(resp.data)
            }
        }).then(error => {
            console.log(error)
        })
    
    } catch (error) {
        //do something
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.SIGN_IN_START, 
        signUserIn
    )
}

export function* onOTPVerificationStart() {
    yield takeLatest(
        UserActionTypes.OTP_VERIFICATION_START, 
        verifyOTP
    )
}

export function* onForgetPasswordStart() {
    yield takeLatest(
        UserActionTypes.FORGET_PASSWORD_START, 
        forgetPasswordStart
    )
}

export function* onSendOTP() {
    yield takeLatest(
        UserActionTypes.SEND_VERIFICATION_OTP, 
        sendOTPToken
    )
}

export function* userSagas() {
    yield all([call(onSignUpStart), call(onEmailSignInStart), call(onForgetPasswordStart), call(onOTPVerificationStart), call(onSendOTP)])
}