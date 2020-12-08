import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import axios from 'axios';
import { signUpSuccess, connectingToServer, signInFailure, toggleSubmittingLogin, toggleSubmittingRegister, signInSuccess, toggleForgettingPassword } from './user.action';

import { emailSignUp, getCurrentUser, CALL_POST_API } from '../../util/user.util';
import { REG_API, LOGIN_API, FORGOT_PASSWORD_API, RESEND_OTP } from '../../config';

export function* signUp({payload: {email, password, fullName, phone}}) {
    let tempName = fullName.split(" ")
    let firstName = tempName[0]
    if (firstName == "") {
        alert("Please enter Full Name")
        return
    }
    let lastName = tempName[1]
    if (tempName[2]) {
        lastName = lastName + " " + tempName[2]
    }

    if (!lastName) {
        lastName = " "
    }
    const data = {
        email: email, 
        password: password, 
        userType: "3000", 
        firstName: firstName, 
        lastName: lastName, 
        phoneNumber: phone
    }
    try {
        yield put(toggleSubmittingRegister(true))
        var user;

        yield emailSignUp(data, REG_API).next().value.then(resp => {
            // console.log(resp)
            const responseBody = resp.data
            if (responseBody) {
                if (Array.isArray(responseBody)) {
                    responseBody.forEach(responseData => {
                        // console.log(responseData)
                        const responseMessage = responseData.msg
                        if (responseMessage) {
                            if (responseMessage == "Account already exist") {
                                alert("Account already exist. \n Kindly sign in with Phone number")
                                return
                            }
                        }
                    });
                } else {
                    if (responseBody.errors) {
                        const errors = responseBody.errors 
                        console.log(errors)
                    }
                }
            }
            // let responseBody = resp.data
            // console.log(responseBody)
            // if (responseBody.errors != null) {
            //     console
            // }
            // if (resp.statusCode === 201) {
            //     const uuid = resp.data.uuid 
            //     user = uuid;
            // }
        })
        yield put(toggleSubmittingRegister(false))
        // console.log("Calling sign up succes")
        yield put(signUpSuccess(data));
    } catch(error) {
        console.log(error)
        // yield signUpFailure(error)
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
        signUp
    )
}

export function* signInWithEmail({payload: {phone, password } }) {
    const data = {
        phoneNumber: phone, 
        password: password
    }
    try {
        yield put(toggleSubmittingLogin(true))
        var response; 

        yield CALL_POST_API(data, LOGIN_API).next().value.then(resp => {
            response = resp
        })
        // console.log(response)
        console.log(response.data)

        if (response.data == "These credentials do not match our records") {
            alert(response.data + "\n Kindly check your password")
        }

        if (response.data == "Unverified account") {
            alert(response.data + "\n Kindly check email for verification code")
        } 
        // const responseBody = response.message 
        // if (responseBody == "These credentials do not match our records.") {
        //     alert("Invalid Login Details. Forgot Password? ")
        //     yield put(toggleSubmittingLogin(false))
        //     return 
        // }
        // yield put(toggleSubmittingLogin(false))
        // yield put(toggleUserLoggedIn(true))
        // yield put(signInSuccess(data))
        yield put(toggleSubmittingLogin(false))
        // yield put(toggleUserLoggedIn(true))
    } catch(error) {
        yield put(signInFailure(error));
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
        signInWithEmail
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

export function* userSagas() {
    yield all([call(onSignUpStart), call(onEmailSignInStart), call(onForgetPasswordStart), call(onOTPVerificationStart)])
}