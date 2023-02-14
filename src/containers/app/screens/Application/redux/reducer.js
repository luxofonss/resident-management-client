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
    REJECT_CHUYEN_KHAU,
    REJECT_CHUYEN_KHAU_FAIL,
    REJECT_CHUYEN_KHAU_RESET,
    REJECT_CHUYEN_KHAU_SUCCESS,
    REJECT_DINH_CHINH_KHAU,
    REJECT_DINH_CHINH_KHAU_FAIL,
    REJECT_DINH_CHINH_KHAU_RESET,
    REJECT_DINH_CHINH_KHAU_SUCCESS,
    REJECT_NHAP_KHAU,
    REJECT_NHAP_KHAU_FAIL,
    REJECT_NHAP_KHAU_RESET,
    REJECT_NHAP_KHAU_SUCCESS,
    REJECT_TACH_KHAU,
    REJECT_TACH_KHAU_FAIL,
    REJECT_TACH_KHAU_RESET,
    REJECT_TACH_KHAU_SUCCESS,
    LAY_DON,
    LAY_DON_FAIL,
    LAY_DON_RESET,
    LAY_DON_SUCCESS,
    ACCEPT_DINH_CHINH_NK,
    ACCEPT_DINH_CHINH_NK_SUCCESS,
    ACCEPT_DINH_CHINH_NK_FAIL,
    ACCEPT_DINH_CHINH_NK_RESET,
    REJECT_DINH_CHINH_NK,
    REJECT_DINH_CHINH_NK_SUCCESS,
    REJECT_DINH_CHINH_NK_FAIL,
    REJECT_DINH_CHINH_NK_RESET,
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
                    state: null,
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
                    state: null,
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
                    state: null,
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
                    state: null,
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
                    state: null,
                    data: null,
                };
            }
            default:
                return state;
        }
    },
    rejectChuyenKhau: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_CHUYEN_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_CHUYEN_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_CHUYEN_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_CHUYEN_KHAU_RESET().type: {
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
    rejectTachKhau: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_TACH_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_TACH_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_TACH_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_TACH_KHAU_RESET().type: {
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
    rejectDinhChinhKhau: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_DINH_CHINH_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_DINH_CHINH_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_DINH_CHINH_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_DINH_CHINH_KHAU_RESET().type: {
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
    rejectNhapKhau: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_NHAP_KHAU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_NHAP_KHAU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_NHAP_KHAU_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_NHAP_KHAU_RESET().type: {
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
    acceptDinhChinhNK: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_DINH_CHINH_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_DINH_CHINH_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_DINH_CHINH_NK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_DINH_CHINH_NK_RESET().type: {
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
    rejectDinhChinhNK: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_DINH_CHINH_NK().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_DINH_CHINH_NK_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_DINH_CHINH_NK_FAIL().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_DINH_CHINH_NK_RESET().type: {
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
