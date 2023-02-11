import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    LAY_LOAI_TB,
    LAY_LOAI_TB_ERROR,
    LAY_LOAI_TB_RESET,
    LAY_LOAI_TB_SUCCESS,
    LAY_PHIEU_MUON,
    LAY_PHIEU_MUON_ERROR,
    LAY_PHIEU_MUON_RESET,
    LAY_PHIEU_MUON_SUCCESS,
    LAY_TAI_NGUYEN,
    LAY_TAI_NGUYEN_ERROR,
    LAY_TAI_NGUYEN_RESET,
    LAY_TAI_NGUYEN_SUCCESS,
    MUON_THIET_BI,
    MUON_THIET_BI_ERROR,
    MUON_THIET_BI_RESET,
    MUON_THIET_BI_SUCCESS,
    TAO_LOAI_TAI_NGUYEN,
    TAO_LOAI_TAI_NGUYEN_ERROR,
    TAO_LOAI_TAI_NGUYEN_RESET,
    TAO_LOAI_TAI_NGUYEN_SUCCESS,
    TAO_TAI_NGUYEN,
    TAO_TAI_NGUYEN_ERROR,
    TAO_TAI_NGUYEN_RESET,
    TAO_TAI_NGUYEN_SUCCESS,
    TRA_THIET_BI,
    TRA_THIET_BI_ERROR,
    TRA_THIET_BI_RESET,
    TRA_THIET_BI_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    danhSachLoaiThietBi: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_LOAI_TB().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_LOAI_TB_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_LOAI_TB_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case LAY_LOAI_TB_RESET().type: {
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
    taoTaiNguyen: (state = defaultState, action) => {
        switch (action.type) {
            case TAO_TAI_NGUYEN().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TAO_TAI_NGUYEN_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TAO_TAI_NGUYEN_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case TAO_TAI_NGUYEN_RESET().type: {
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
    taoLoaiTaiNguyen: (state = defaultState, action) => {
        switch (action.type) {
            case TAO_LOAI_TAI_NGUYEN().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TAO_LOAI_TAI_NGUYEN_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TAO_LOAI_TAI_NGUYEN_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case TAO_LOAI_TAI_NGUYEN_RESET().type: {
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
    muonThietBi: (state = defaultState, action) => {
        switch (action.type) {
            case MUON_THIET_BI().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case MUON_THIET_BI_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case MUON_THIET_BI_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case MUON_THIET_BI_RESET().type: {
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
    traThietBi: (state = defaultState, action) => {
        switch (action.type) {
            case TRA_THIET_BI().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TRA_THIET_BI_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TRA_THIET_BI_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case TRA_THIET_BI_RESET().type: {
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
    layPhieuMuon: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_PHIEU_MUON().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_PHIEU_MUON_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_PHIEU_MUON_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case LAY_PHIEU_MUON_RESET().type: {
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
    layTaiNguyen: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_TAI_NGUYEN().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_TAI_NGUYEN_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_TAI_NGUYEN_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case LAY_TAI_NGUYEN_RESET().type: {
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
