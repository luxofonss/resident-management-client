import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import {
    apiLayHK,
    apiThemHK,
    apiChuyenHK,
    apiTachHK,
    apiNhapHK,
    apiUpdateHK,
    apiAcceptUpdateHK,
    apiTrackBack,
} from '~/app-data/hoKhau';
import {
    ACCEPT_UPDATE_HK,
    ACCEPT_UPDATE_HK_FAIL,
    ACCEPT_UPDATE_HK_SUCCESS,
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
    TRACK_BACK_HK,
    TRACK_BACK_HK_FAIL,
    TRACK_BACK_HK_SUCCESS,
    UPDATE_HK,
    UPDATE_HK_FAIL,
    UPDATE_HK_SUCCESS,
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

function* handleUpdateHK({ type, payload }) {
    try {
        const response = yield call(apiUpdateHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(UPDATE_HK_SUCCESS({ data: response.data }));
        } else {
            yield put(UPDATE_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptUpdateHK({ type, payload }) {
    try {
        const response = yield call(apiAcceptUpdateHK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_UPDATE_HK_SUCCESS({ data: response.data }));
        } else {
            yield put(ACCEPT_UPDATE_HK_FAIL());
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

function* handleTrackBack({ type, payload }) {
    try {
        const response = yield call(apiTrackBack, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TRACK_BACK_HK_SUCCESS(response.data));
        } else {
            yield put(TRACK_BACK_HK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(THEM_HK().type, handleThemHK);
    yield takeLatest(UPDATE_HK().type, handleUpdateHK);
    yield takeLatest(ACCEPT_UPDATE_HK().type, handleAcceptUpdateHK);
    yield takeLatest(LAY_HK().type, handleLayHK);
    yield takeLatest(CHUYEN_HK().type, handleChuyenHK);
    yield takeLatest(TACH_HK().type, handleTachHK);
    yield takeLatest(NHAP_HK().type, handleNhapHK);
    yield takeLatest(TRACK_BACK_HK().type, handleTrackBack);
}
