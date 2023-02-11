import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    ACCEPT_CHUYEN_KHAU,
    ACCEPT_CHUYEN_KHAU_FAIL,
    ACCEPT_CHUYEN_KHAU_RESET,
    ACCEPT_CHUYEN_KHAU_SUCCESS,
    ACCEPT_DINH_CHINH_KHAU,
    ACCEPT_DINH_CHINH_KHAU_FAIL,
    ACCEPT_DINH_CHINH_KHAU_RESET,
    ACCEPT_DINH_CHINH_KHAU_SUCCESS,
    ACCEPT_NHAP_KHAU,
    ACCEPT_NHAP_KHAU_FAIL,
    ACCEPT_NHAP_KHAU_RESET,
    ACCEPT_NHAP_KHAU_SUCCESS,
    ACCEPT_TACH_KHAU,
    ACCEPT_TACH_KHAU_FAIL,
    ACCEPT_TACH_KHAU_RESET,
    ACCEPT_TACH_KHAU_SUCCESS,
    LAY_DON,
    LAY_DON_FAIL,
    LAY_DON_RESET,
    LAY_DON_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_DON().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_DON_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_DON_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case LAY_DON_RESET().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.RESET,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    acpChuyenKhau: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_CHUYEN_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_CHUYEN_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_CHUYEN_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_CHUYEN_KHAU_RESET().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.RESET,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    acpTachKhau: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_TACH_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_TACH_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_TACH_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_TACH_KHAU_RESET().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.RESET,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    acpDinhChinhKhau: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_DINH_CHINH_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_DINH_CHINH_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_DINH_CHINH_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_DINH_CHINH_KHAU_RESET().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.RESET,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    acpNhapKhau: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_NHAP_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_NHAP_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_NHAP_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_NHAP_KHAU_RESET().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.RESET,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
});
