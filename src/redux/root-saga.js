import { all, call } from 'redux-saga/effects';

import { settingsSagas } from './settings/settings.sagas';
import { userSagas } from './user/user.saga';

export default function* rootSaga() {
    yield all([call(userSagas), call(settingsSagas)]);
}