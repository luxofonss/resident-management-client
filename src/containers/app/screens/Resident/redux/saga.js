import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayNK } from '~/app-data/nhanKhau';
import { LAY_NK, LAY_NK_FAIL, LAY_NK_SUCCESS } from './action';

function* handleLayNhanKhau({ type, payload }) {
    try {
        const response = yield call(apiLayNK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_NK_SUCCESS({ data: response.data }));
        } else {
            yield put(LAY_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_NK().type, handleLayNhanKhau);
}
