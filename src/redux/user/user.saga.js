import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import axios from 'axios';
import { signUpSuccess, connectingToServer, signInFailure, toggleSubmittingLogin, toggleSubmittingRegister, signInSuccess } from './user.action';

import { emailSignUp, getCurrentUser, CALL_POST_API } from '../../util/user.util';
import { API_STRING, REG_API, LOGIN_API } from '../../config';

export function* signUp({payload: {email, password, fullName, userType, phone}}) {
    let tempName = fullName.split(" ")
    let firstName = tempName[0]
    let lastName = tempName[1]
    if (tempName[2]) {
        lastName = lastName + " " + tempName[2]
    }
    const data = {
        email: email, 
        password: password, 
        userType: userType, 
        firstName: firstName, 
        lastName: lastName, 
        phoneNumber: phone
    }
    try {
        yield put(toggleSubmittingRegister(true))
        var user;

       yield emailSignUp(data, REG_API).next().value.then(resp => {
           console.log(resp)
            if (resp.statusCode === 201) {
                const uuid = resp.data.uuid 
                user = uuid;
            }
        })
        // console.log("Calling sign up succes")
        yield put(signInSuccess(user));
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

export function* signInWithEmail({payload: {email, password } }) {
    const data = {
        email: email, 
        password: password
    }
    try {
        yield put(toggleSubmittingLogin(true))
        var response; 

        yield CALL_POST_API(data, LOGIN_API).next().value.then(resp => {
            response = resp
        })
        console.log(response)
        // yield signInSuccess()
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.SIGN_IN_START, 
        signInWithEmail
    )
}

export function* userSagas() {
    yield all([call(onSignUpStart), call(onEmailSignInStart)])
}