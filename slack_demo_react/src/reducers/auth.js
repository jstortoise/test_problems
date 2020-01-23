import { WORKSPACE_FOUND, WORKSPACE_ERROR, AUTH_DONE, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
    team: {
        found: false,
        teamId: '',
        teamUrl: '',
        error: false
    },
    user: {
        authenticated: false,
        userId: '',
        email: '',
        token: '',
        error: false
    }
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WORKSPACE_FOUND: 
            return {
                ...state, 
                team: {
                    found: true,
                    teamId: action.payload.team_id,
                    teamUrl: action.payload.url,
                    error: false
                }
            };
        case WORKSPACE_ERROR: 
            return {
                ...state, 
                team: {
                    found: false,
                    teamId: '',
                    teamUrl: '',
                    error: true
                }
            };
        case AUTH_DONE: 
            return {
                ...state, 
                user: {
                    authenticated: true,
                    userId: action.payload.user,
                    email: action.payload.user_email,
                    token: action.payload.token,
                    error: false
                }
            };
        case AUTH_ERROR: 
            return {
                ...state, 
                user: {
                    authenticated: false,
                    userId: '',
                    email: '',
                    token: '',
                    error: true
                }
            };
        default:
            return state;
    }
};