import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import settingsReducer from './settings/settings.reducers';
import userReducer from './user/user.reducer';

const persistConfig = {
    key: 'root', 
    storage: AsyncStorage, 
    blacklist: ['user', 'settings'],
};

const rootReducer = combineReducers({
    settings: settingsReducer, 
    user: userReducer
});

export default persistReducer(persistConfig, rootReducer);