import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayNK, apiThemNK, apiKhaiSinhNK, apiCapNhatNK, apiKhaiTuNK } from '~/app-data/nhanKhau';
import {
    CAP_NHAT_NK,
    CAP_NHAT_NK_FAIL,
    CAP_NHAT_NK_SUCCESS,
    KHAI_SINH_NK,
    KHAI_SINH_NK_FAIL,
    KHAI_SINH_NK_SUCCESS,
    KHAI_TU_NK,
    KHAI_TU_NK_FAIL,
    KHAI_TU_NK_SUCCESS,
    LAY_NK,
    LAY_NK_FAIL,
    LAY_NK_SUCCESS,
    THEM_NK,
    THEM_NK_FAIL,
    THEM_NK_SUCCESS,
} from './action';

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

function* handleThemNhanKhau({ type, payload }) {
    try {
        const response = yield call(apiThemNK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(THEM_NK_SUCCESS(response.data));
        } else {
            yield put(THEM_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleKhaiSinhNhanKhau({ type, payload }) {
    try {
        const response = yield call(apiKhaiSinhNK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(KHAI_SINH_NK_SUCCESS(response.data));
        } else {
            yield put(KHAI_SINH_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleCapNhatNhanKhau({ type, payload }) {
    try {
        const response = yield call(apiCapNhatNK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(CAP_NHAT_NK_SUCCESS(response.data));
        } else {
            yield put(CAP_NHAT_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleKhaiTuNhanKhau({ type, payload }) {
    try {
        const response = yield call(apiKhaiTuNK, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(KHAI_TU_NK_SUCCESS(response.data));
        } else {
            yield put(KHAI_TU_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_NK().type, handleLayNhanKhau);
    yield takeLatest(THEM_NK().type, handleThemNhanKhau);
    yield takeLatest(KHAI_SINH_NK().type, handleKhaiSinhNhanKhau);
    yield takeLatest(CAP_NHAT_NK().type, handleCapNhatNhanKhau);
    yield takeLatest(KHAI_TU_NK().type, handleKhaiTuNhanKhau);
}
