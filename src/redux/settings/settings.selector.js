import { createSelector } from 'reselect';

const selectSettings = state => state.settings; 

export const selectAppSettings = createSelector(
    [selectSettings],
    settings => settings.appSettings
);