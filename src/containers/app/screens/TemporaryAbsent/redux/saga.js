import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayTamVang } from '~/app-data/tamTruTamVang';
import { LAY_TAM_VANG, LAY_TAM_VANG_ERROR, LAY_TAM_VANG_SUCCESS } from './action';

function* handleLayTamVang({ type, payload }) {
    try {
        const response = yield call(apiLayTamVang, payload);

        if (response.status === REQUEST_STATE.SUCCESS) {
            put(LAY_TAM_VANG_SUCCESS(response.data));
        } else {
            put(LAY_TAM_VANG_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_TAM_VANG().type, handleLayTamVang);
}
