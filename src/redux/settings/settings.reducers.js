import SettingsActionTypes from './settings.types';
import { appSettings } from '../../config';

const INITIAL_STATE = {
    appSettings: appSettings,
};

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SettingsActionTypes.SET_APP_MODE:
            return {
                ...state, 
                appSettings: { ...state.appSettings, ...action.payload }
            };
        default:
            return state;
    }
};

export default settingsReducer;