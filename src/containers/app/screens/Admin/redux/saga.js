import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiDuyetUser, apiLayUser, apiTaoUser } from '~/app-data/users';
import {
    DUYET_USER,
    DUYET_USER_FAIL,
    DUYET_USER_SUCCESS,
    LAY_USER,
    LAY_USER_FAIL,
    LAY_USER_SUCCESS,
    TAO_USER,
    TAO_USER_FAIL,
    TAO_USER_SUCCESS,
} from './action';

function* handleLayUser({ type, payload }) {
    try {
        const response = yield call(apiLayUser, payload);

        console.log('response', response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_USER_SUCCESS(response.data));
        } else {
            yield put(LAY_USER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleDuyetUser({ type, payload }) {
    try {
        const response = yield call(apiDuyetUser, payload);

        console.log('response', response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(DUYET_USER_SUCCESS(response.data));
        } else {
            yield put(DUYET_USER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleTaoUser({ type, payload }) {
    try {
        const response = yield call(apiTaoUser, payload);

        console.log('response', response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TAO_USER_SUCCESS(response.data));
        } else {
            yield put(TAO_USER_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_USER().type, handleLayUser);
    yield takeLatest(DUYET_USER().type, handleDuyetUser);
    yield takeLatest(TAO_USER().type, handleTaoUser);
}
