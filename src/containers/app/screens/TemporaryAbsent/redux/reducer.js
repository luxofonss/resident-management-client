import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import {
    ACCEPT_TAM_TRU,
    ACCEPT_TAM_TRU_ERROR,
    ACCEPT_TAM_TRU_RESET,
    ACCEPT_TAM_TRU_SUCCESS,
    ACCEPT_TAM_VANG,
    ACCEPT_TAM_VANG_ERROR,
    ACCEPT_TAM_VANG_RESET,
    ACCEPT_TAM_VANG_SUCCESS,
    LAY_TAM_TRU,
    LAY_TAM_TRU_ERROR,
    LAY_TAM_TRU_SUCCESS,
    LAY_TAM_VANG,
    LAY_TAM_VANG_ERROR,
    LAY_TAM_VANG_SUCCESS,
    REJECT_TAM_TRU,
    REJECT_TAM_TRU_ERROR,
    REJECT_TAM_TRU_RESET,
    REJECT_TAM_TRU_SUCCESS,
    REJECT_TAM_VANG,
    REJECT_TAM_VANG_ERROR,
    REJECT_TAM_VANG_RESET,
    REJECT_TAM_VANG_SUCCESS,
    TAO_TAM_TRU,
    TAO_TAM_TRU_ERROR,
    TAO_TAM_TRU_RESET,
    TAO_TAM_TRU_SUCCESS,
    TAO_TAM_VANG,
    TAO_TAM_VANG_ERROR,
    TAO_TAM_VANG_RESET,
    TAO_TAM_VANG_SUCCESS,
} from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    tamVangList: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_TAM_VANG().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_TAM_VANG_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_TAM_VANG_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }

            default:
                return state;
        }
    },
    acpTamVang: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_TAM_VANG().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_TAM_VANG_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_TAM_VANG_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_TAM_VANG_RESET().type: {
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
    addTamVang: (state = defaultState, action) => {
        switch (action.type) {
            case TAO_TAM_VANG().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TAO_TAM_VANG_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TAO_TAM_VANG_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case TAO_TAM_VANG_RESET().type: {
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
    tamTruList: (state = defaultState, action) => {
        switch (action.type) {
            case LAY_TAM_TRU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case LAY_TAM_TRU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case LAY_TAM_TRU_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            default:
                return state;
        }
    },
    addTamTru: (state = defaultState, action) => {
        switch (action.type) {
            case TAO_TAM_TRU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case TAO_TAM_TRU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case TAO_TAM_TRU_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case TAO_TAM_TRU_RESET().type: {
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
    acpTamTru: (state = defaultState, action) => {
        switch (action.type) {
            case ACCEPT_TAM_TRU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case ACCEPT_TAM_TRU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case ACCEPT_TAM_TRU_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case ACCEPT_TAM_TRU_RESET().type: {
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

    rejectTamTru: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_TAM_TRU().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_TAM_TRU_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_TAM_TRU_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_TAM_TRU_RESET().type: {
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

    rejectTamVang: (state = defaultState, action) => {
        switch (action.type) {
            case REJECT_TAM_VANG().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.REQUEST,
                };
            }
            case REJECT_TAM_VANG_SUCCESS().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.SUCCESS,
                    data: action.payload,
                };
            }
            case REJECT_TAM_VANG_ERROR().type: {
                return {
                    ...state,
                    state: REQUEST_STATE.ERROR,
                };
            }
            case REJECT_TAM_VANG_RESET().type: {
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
