import { combineReducers } from 'redux';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_LOAI_TB, LAY_LOAI_TB_ERROR, LAY_LOAI_TB_SUCCESS } from './action';

const defaultState = {
    state: null,
    data: null,
};

export default combineReducers({
    list: (state = defaultState, action) => {
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
            default:
                return state;
        }
    },
});
