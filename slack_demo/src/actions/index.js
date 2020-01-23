import { WORKSPACE_FOUND, WORKSPACE_ERROR, AUTH_DONE, AUTH_ERROR } from './types';
import axios from 'axios';
import qs from 'querystring';

const API_BASE_URL = 'https://slack.com/api';

// Find workspace using slack API
export const findWorkspace = (domain, callback) => async dispatch => {
    const requestBody = {
        domain: domain
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const endpoint = API_BASE_URL + '/auth.findTeam';
    
    try {
        const response = await axios.post(endpoint, qs.stringify(requestBody), config);
        console.log(response);
        if (response.data.ok === true) {
            dispatch({
                type: WORKSPACE_FOUND,
                payload: response.data
            });
        } else {
            dispatch({
                type: WORKSPACE_ERROR
            });
        }
        
        callback();
    } catch (e) {
        dispatch({
            type: WORKSPACE_ERROR
        });
        callback();
    }
    
}

// Authenticate User
export const authUser = ({ email, password }, callback) => async (dispatch, getState) => {
    const { auth } = getState();

    const requestBody = {
        team: auth.team.teamId,
        email: email,
        password: password
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const endpoint = API_BASE_URL + '/auth.signin';
    
    try {
        const response = await axios.post(endpoint, qs.stringify(requestBody), config);
        console.log(response);
        if (response.data.ok === true) {
            dispatch({
                type: AUTH_DONE,
                payload: response.data
            });
        } else {
            dispatch({
                type: AUTH_ERROR
            });
        }
        
        callback();
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        });
        callback();
    }
    
}