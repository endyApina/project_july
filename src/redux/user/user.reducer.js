import UserActionTypes from './user.types';
const INITIAL_STATE = {
    currentUser: null, 
    error: null, 
    connectingToServer: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case UserActionTypes.CONNECTING_TO_SERVER: 
        return {
            ...state, 
            connectingToServer: action.payload
        };
    default: 
        return state; 
    }
}

export default userReducer