import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    DUYET_USER,
    DUYET_USER_FAIL,
    DUYET_USER_RESET,
    DUYET_USER_SUCCESS,
    LAY_USER,
    LAY_USER_FAIL,
    LAY_USER_RESET,
    LAY_USER_SUCCESS,
    TAO_USER,
    TAO_USER_FAIL,
    TAO_USER_RESET,
    TAO_USER_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_USER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_USER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_USER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case LAY_USER_RESET().type: {
                return {
                    ...state,
                    state: null,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    acceptUser: (state = defaultState, action) => {
        switch (action.type) {
            case DUYET_USER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case DUYET_USER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case DUYET_USER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case DUYET_USER_RESET().type: {
                return {
                    ...state,
                    state: null,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    createUser: (state = defaultState, action) => {
        switch (action.type) {
            case TAO_USER().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TAO_USER_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TAO_USER_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case TAO_USER_RESET().type: {
                return {
                    ...state,
                    state: null,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
});
