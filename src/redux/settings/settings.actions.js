import SettingsActionTypes from './settings.types';

export const updateAppMode = mode => ({
    type: SettingsActionTypes.SET_APP_MODE,
    payload: mode
});