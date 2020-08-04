import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signUpSuccess, connectingToServer } from './user.action';

import {emailSignIn} from '../../util/user.util';

export function* signUp({payload: {email, password, fullName, userType, phone}}) {
    try {
        const {user} = yield call(emailSignIn(email, password, fullName, phone, userType));
        yield signUpFailure(error)
        yield put(connectingToServer(true))
        // yield put(signUpSuccess({user, additionalData: {appMode: 'default' }}))
        yield console.error(user)
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

export function* userSagas() {
    yield all([call(onSignUpStart)])
}