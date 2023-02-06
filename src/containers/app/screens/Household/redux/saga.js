import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayHK, apiThemHK, apiChuyenHK, apiTachHK, apiNhapHK } from '~/app-data/hoKhau';
import {
    CHUYEN_HK,
    CHUYEN_HK_FAIL,
    CHUYEN_HK_SUCCESS,
    LAY_HK,
    LAY_HK_FAIL,
    LAY_HK_SUCCESS,
    NHAP_HK,
    NHAP_HK_FAIL,
    NHAP_HK_SUCCESS,
    TACH_HK,
    TACH_HK_FAIL,
    TACH_HK_SUCCESS,
    THEM_HK,
    THEM_HK_FAIL,
    THEM_HK_SUCCESS,
} from './action';

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

function* handleChuyenHK({ type, payload }) {
    try {
        const response = yield call(apiChuyenHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CHUYEN_HK_SUCCESS(response.data));
        } else {
            yield put(CHUYEN_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleTachHK({ type, payload }) {
    try {
        const response = yield call(apiTachHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TACH_HK_SUCCESS(response.data));
        } else {
            yield put(TACH_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleNhapHK({ type, payload }) {
    try {
        const response = yield call(apiNhapHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(NHAP_HK_SUCCESS(response.data));
        } else {
            yield put(NHAP_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(THEM_HK().type, handleThemHK);
    yield takeLatest(LAY_HK().type, handleLayHK);
    yield takeLatest(CHUYEN_HK().type, handleChuyenHK);
    yield takeLatest(TACH_HK().type, handleTachHK);
    yield takeLatest(NHAP_HK().type, handleNhapHK);
}
