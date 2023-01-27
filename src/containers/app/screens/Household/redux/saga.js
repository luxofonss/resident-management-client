import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayHK, apiThemHK } from '~/app-data/hoKhau';
import { LAY_HK, LAY_HK_FAIL, LAY_HK_SUCCESS, THEM_HK, THEM_HK_FAIL, THEM_HK_SUCCESS } from './action';

function* handleThemHK({ type, payload }) {
    try {
        const response = yield call(apiThemHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(THEM_HK_SUCCESS({ data: response.data }));
        } else {
            yield put(THEM_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleLayHK({ type, payload }) {
    try {
        const response = yield call(apiLayHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_HK_SUCCESS(response.data));
        } else {
            yield put(LAY_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(THEM_HK().type, handleThemHK);
    yield takeLatest(LAY_HK().type, handleLayHK);
}
