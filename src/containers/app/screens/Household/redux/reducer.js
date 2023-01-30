import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    CHUYEN_HK,
    CHUYEN_HK_FAIL,
    CHUYEN_HK_SUCCESS,
    LAY_HK,
    LAY_HK_FAIL,
    LAY_HK_SUCCESS,
    TACH_HK,
    TACH_HK_FAIL,
    TACH_HK_SUCCESS,
    THEM_HK,
    THEM_HK_FAIL,
    THEM_HK_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    themHK: (state = defaultState, action) => {
        switch (action.type) {
            case THEM_HK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case THEM_HK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case THEM_HK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    danhSach: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_HK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_HK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_HK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    chuyenHK: (state = defaultState, action) => {
        switch (action.type) {
            case CHUYEN_HK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CHUYEN_HK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CHUYEN_HK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    tachHK: (state = defaultState, action) => {
        switch (action.type) {
            case TACH_HK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TACH_HK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TACH_HK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
});
