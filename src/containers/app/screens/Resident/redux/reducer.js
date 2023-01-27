import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_NK, LAY_NK_FAIL, LAY_NK_SUCCESS } from './action';

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
});
