import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    clientId: null,
    clientName: null,
};

export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, 
                isSignedIn: true, 
                clientId: action.payload.clientId, 
                clientName: action.payload.clientName
            };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, 
                clientId: null,
                clientName: null
            };
        default:
            return state;
    };
};