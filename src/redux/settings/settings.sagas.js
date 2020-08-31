import { takeLatest, call, all, put } from 'redux-saga/effects';
import { updateAppMode } from './settings.actions';
import {toggleUserLoggedIn} from '../user/user.action';
import { appModes } from '../../config';
import UserActionTypes from '../user/user.types';

export function* getAppMode() {
    try {
        // console.log("Get APP mode")
        yield put(toggleUserLoggedIn(true))
        // yield put(updateAppMode(userAppMode));
    } catch(error) {
        //Do Something
    }
}

export function* onSignInSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_IN_SUCCESS,
        getAppMode
    )
}

export function* settingsSagas() {
    yield all([call(onSignInSuccess)]);
}