import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    CAP_NHAT_NK,
    CAP_NHAT_NK_FAIL,
    CAP_NHAT_NK_SUCCESS,
    KHAI_SINH_NK,
    KHAI_SINH_NK_FAIL,
    KHAI_SINH_NK_SUCCESS,
    KHAI_TU_NK,
    KHAI_TU_NK_FAIL,
    KHAI_TU_NK_SUCCESS,
    LAY_NK,
    LAY_NK_FAIL,
    LAY_NK_SUCCESS,
    THEM_NK,
    THEM_NK_FAIL,
    THEM_NK_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_NK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    themNK: (state = defaultState, action) => {
        switch (action.type) {
            case THEM_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case THEM_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case THEM_NK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    khaiSinhNK: (state = defaultState, action) => {
        switch (action.type) {
            case KHAI_SINH_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case KHAI_SINH_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case KHAI_SINH_NK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    capNhatNK: (state = defaultState, action) => {
        switch (action.type) {
            case CAP_NHAT_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case CAP_NHAT_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case CAP_NHAT_NK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    khaiTuNK: (state = defaultState, action) => {
        switch (action.type) {
            case KHAI_TU_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case KHAI_TU_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case KHAI_TU_NK_FAIL().type: {
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
