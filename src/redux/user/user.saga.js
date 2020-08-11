import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signUpSuccess, connectingToServer, signInFailure, toggleSubmittingLogin, toggleSubmittingRegister } from './user.action';

import { emailSignIn, getCurrentUser } from '../../util/user.util';
import {API_STRING} from '../../config';

export function* signUp({payload: {email, password, fullName, userType, phone}}) {
    const data = {
        email: email, 
        password: password, 
        fullName: fullName, 
        userType: userType, 
        phone: phone
    }
    try {
        yield put(toggleSubmittingRegister(true))
        const response = fetch(API_STRING, {
            method: 'POST', 
            headers: {
                'source': 'mobile', 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        })
        .then(data => {
            alert(JSON.stringify(data))
        })
        // const {user} = yield call(emailSignIn(email, password, fullName, phone, userType));
        // yield signUpFailure(error)
        // yield put(connectingToServer(true))
        // // yield put(signUpSuccess({user, additionalData: {appMode: 'default' }}))
        // yield console.error(user)
    } catch(error) {
        yield signUpFailure(error)
    }
}

export function* onSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUp
    )
}

export function* signInWithEmail({payload: {email, password } }) {
    try {
        yield put(toggleSubmittingLogin(true))
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password); 

        const response = yield fetch('http://milky-way-api.us-east-1.elasticbeanstalk.com/api/v1/auth/signup', {
            method: 'POST', 
            body: formData
        })

        alert(JSON.stringify(response))
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