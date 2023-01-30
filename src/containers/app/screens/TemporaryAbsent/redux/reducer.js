import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_TAM_VANG, LAY_TAM_VANG_ERROR, LAY_TAM_VANG_SUCCESS } from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
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
});
