import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayDon } from '~/app-data/don';
import {
    apiAcceptCK,
    apiAcceptTK,
    apiAcceptDinhChinhKhau,
    apiAcceptNhapKhau,
    apiRejectCK,
    apiRejectTK,
    apiRejectDinhChinhKhau,
    apiRejectNhapKhau,
} from '~/app-data/hoKhau';
import { apiAcceptDinhChinhNhanKhau, apiRejectDinhChinhNhanKhau } from '~/app-data/nhanKhau';
import {
    ACCEPT_CHUYEN_KHAU,
    ACCEPT_CHUYEN_KHAU_FAIL,
    ACCEPT_CHUYEN_KHAU_SUCCESS,
    ACCEPT_DINH_CHINH_KHAU,
    ACCEPT_DINH_CHINH_KHAU_FAIL,
    ACCEPT_DINH_CHINH_KHAU_SUCCESS,
    ACCEPT_NHAP_KHAU,
    ACCEPT_NHAP_KHAU_FAIL,
    ACCEPT_NHAP_KHAU_SUCCESS,
    ACCEPT_TACH_KHAU,
    ACCEPT_TACH_KHAU_FAIL,
    ACCEPT_TACH_KHAU_SUCCESS,
    REJECT_CHUYEN_KHAU,
    REJECT_CHUYEN_KHAU_FAIL,
    REJECT_CHUYEN_KHAU_SUCCESS,
    REJECT_DINH_CHINH_KHAU,
    REJECT_DINH_CHINH_KHAU_FAIL,
    REJECT_DINH_CHINH_KHAU_SUCCESS,
    REJECT_NHAP_KHAU,
    REJECT_NHAP_KHAU_FAIL,
    REJECT_NHAP_KHAU_SUCCESS,
    REJECT_TACH_KHAU,
    REJECT_TACH_KHAU_FAIL,
    REJECT_TACH_KHAU_SUCCESS,
    LAY_DON,
    LAY_DON_ERROR,
    LAY_DON_SUCCESS,
    ACCEPT_DINH_CHINH_NK_SUCCESS,
    ACCEPT_DINH_CHINH_NK_FAIL,
    ACCEPT_DINH_CHINH_NK,
    REJECT_DINH_CHINH_NK,
} from './action';

function* handleLayDon({ type, payload }) {
    try {
        const response = yield call(apiLayDon, payload);

        console.log('response', response);
        if (response.state === REQUEST_STATE.SUCCESS) {
            console.log('successsssssssssssssss', response.data);
            yield put(LAY_DON_SUCCESS(response.data));
        } else {
            yield put(LAY_DON_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptCK({ type, payload }) {
    try {
        const response = yield call(apiAcceptCK, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_CHUYEN_KHAU_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_CHUYEN_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptTK({ type, payload }) {
    try {
        const response = yield call(apiAcceptTK, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_TACH_KHAU_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_TACH_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptDinhChinhKhau({ type, payload }) {
    try {
        const response = yield call(apiAcceptDinhChinhKhau, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_DINH_CHINH_KHAU_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_DINH_CHINH_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptNhapKhau({ type, payload }) {
    try {
        const response = yield call(apiAcceptNhapKhau, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_NHAP_KHAU_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_NHAP_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleRejectCK({ type, payload }) {
    try {
        const response = yield call(apiRejectCK, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(REJECT_CHUYEN_KHAU_SUCCESS(response.data));
        } else {
            yield put(REJECT_CHUYEN_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleRejectTK({ type, payload }) {
    try {
        const response = yield call(apiRejectTK, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(REJECT_TACH_KHAU_SUCCESS(response.data));
        } else {
            yield put(REJECT_TACH_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleRejectDinhChinhKhau({ type, payload }) {
    try {
        const response = yield call(apiRejectDinhChinhKhau, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(REJECT_DINH_CHINH_KHAU_SUCCESS(response.data));
        } else {
            yield put(REJECT_DINH_CHINH_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleRejectNhapKhau({ type, payload }) {
    try {
        const response = yield call(apiRejectNhapKhau, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(REJECT_NHAP_KHAU_SUCCESS(response.data));
        } else {
            yield put(REJECT_NHAP_KHAU_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleAcceptDinhChinhNhapKhau({ type, payload }) {
    try {
        const response = yield call(apiAcceptDinhChinhNhanKhau, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(ACCEPT_DINH_CHINH_NK_SUCCESS(response.data));
        } else {
            yield put(ACCEPT_DINH_CHINH_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleRejectDinhChinhNhapKhau({ type, payload }) {
    try {
        const response = yield call(apiRejectDinhChinhNhanKhau, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(REJECT_DINH_CHINH_NK_SUCCESS(response.data));
        } else {
            yield put(REJECT_DINH_CHINH_NK_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_DON().type, handleLayDon);
    yield takeLatest(ACCEPT_CHUYEN_KHAU().type, handleAcceptCK);
    yield takeLatest(ACCEPT_TACH_KHAU().type, handleAcceptTK);
    yield takeLatest(ACCEPT_DINH_CHINH_KHAU().type, handleAcceptDinhChinhKhau);
    yield takeLatest(ACCEPT_NHAP_KHAU().type, handleAcceptNhapKhau);
    yield takeLatest(REJECT_CHUYEN_KHAU().type, handleRejectCK);
    yield takeLatest(REJECT_TACH_KHAU().type, handleRejectTK);
    yield takeLatest(REJECT_DINH_CHINH_KHAU().type, handleRejectDinhChinhKhau);
    yield takeLatest(REJECT_NHAP_KHAU().type, handleRejectNhapKhau);
    yield takeLatest(ACCEPT_DINH_CHINH_NK().type, handleAcceptDinhChinhNhapKhau);
    yield takeLatest(REJECT_DINH_CHINH_NK().type, handleRejectDinhChinhNhapKhau);
}
