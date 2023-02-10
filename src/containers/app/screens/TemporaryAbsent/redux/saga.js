import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import {
    apiLayTamVang,
    apiAcceptTamVang,
    apiLayTamTru,
    apiAcceptTamTru,
    apiAddTamVang,
    apiAddTamTru,
} from '~/app-data/tamTruTamVang';
import {
    ACCEPT_TAM_TRU,
    ACCEPT_TAM_TRU_ERROR,
    ACCEPT_TAM_TRU_SUCCESS,
    ACCEPT_TAM_VANG,
    ACCEPT_TAM_VANG_ERROR,
    ACCEPT_TAM_VANG_SUCCESS,
    LAY_TAM_TRU,
    LAY_TAM_TRU_ERROR,
    LAY_TAM_TRU_SUCCESS,
    LAY_TAM_VANG,
    LAY_TAM_VANG_ERROR,
    LAY_TAM_VANG_SUCCESS,
    TAO_TAM_TRU,
    TAO_TAM_TRU_ERROR,
    TAO_TAM_TRU_SUCCESS,
    TAO_TAM_VANG,
    TAO_TAM_VANG_ERROR,
    TAO_TAM_VANG_SUCCESS,
} from './action';

function* handleLayTamVang({ type, payload }) {
    try {
        const response = yield call(apiLayTamVang, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_TAM_VANG_SUCCESS(response.data));
        } else {
            yield put(LAY_TAM_VANG_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAddTamVang({ type, payload }) {
    try {
        const response = yield call(apiAddTamVang, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TAO_TAM_VANG_SUCCESS(response.data));
        } else {
            yield put(TAO_TAM_VANG_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptTamVang({ type, payload }) {
    try {
        const response = yield call(apiAcceptTamVang, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_TAM_VANG_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_TAM_VANG_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleLayTamTru({ type, payload }) {
    try {
        const response = yield call(apiLayTamTru, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_TAM_TRU_SUCCESS(response.data));
        } else {
            yield put(LAY_TAM_TRU_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptTamTru({ type, payload }) {
    try {
        const response = yield call(apiAcceptTamTru, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_TAM_TRU_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_TAM_TRU_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAddTamTru({ type, payload }) {
    try {
        const response = yield call(apiAddTamTru, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TAO_TAM_TRU_SUCCESS(response.data));
        } else {
            yield put(TAO_TAM_TRU_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_TAM_VANG().type, handleLayTamVang);
    yield takeLatest(ACCEPT_TAM_VANG().type, handleAcceptTamVang);
    yield takeLatest(LAY_TAM_TRU().type, handleLayTamTru);
    yield takeLatest(ACCEPT_TAM_TRU().type, handleAcceptTamTru);
    yield takeLatest(TAO_TAM_VANG().type, handleAddTamVang);
    yield takeLatest(TAO_TAM_TRU().type, handleAddTamTru);
}
