import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import {
    apiLayLoaiTB,
    apiTaoTaiNguyen,
    apiTaoLoaiTaiNguyen,
    apiMuonThietBi,
    apiTraThietBi,
    apiLayPhieuMuon,
    apiLayTaiNguyen,
} from '~/app-data/thietBi';
import {
    LAY_LOAI_TB,
    LAY_LOAI_TB_ERROR,
    LAY_LOAI_TB_SUCCESS,
    LAY_PHIEU_MUON,
    LAY_PHIEU_MUON_ERROR,
    LAY_PHIEU_MUON_SUCCESS,
    LAY_TAI_NGUYEN,
    LAY_TAI_NGUYEN_ERROR,
    LAY_TAI_NGUYEN_SUCCESS,
    MUON_THIET_BI,
    MUON_THIET_BI_ERROR,
    MUON_THIET_BI_SUCCESS,
    TAO_LOAI_TAI_NGUYEN,
    TAO_LOAI_TAI_NGUYEN_ERROR,
    TAO_LOAI_TAI_NGUYEN_SUCCESS,
    TAO_TAI_NGUYEN,
    TAO_TAI_NGUYEN_ERROR,
    TAO_TAI_NGUYEN_SUCCESS,
    TRA_THIET_BI,
    TRA_THIET_BI_ERROR,
    TRA_THIET_BI_SUCCESS,
} from './action';

function* handleLayLoaiTB({ type, payload }) {
    try {
        const response = yield call(apiLayLoaiTB, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_LOAI_TB_SUCCESS(response.data));
        } else {
            yield put(LAY_LOAI_TB_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleTaoTaiNguyen({ type, payload }) {
    try {
        const response = yield call(apiTaoTaiNguyen, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TAO_TAI_NGUYEN_SUCCESS(response.data));
        } else {
            yield put(TAO_TAI_NGUYEN_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleTaoLoaiTaiNguyen({ type, payload }) {
    try {
        const response = yield call(apiTaoLoaiTaiNguyen, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TAO_LOAI_TAI_NGUYEN_SUCCESS(response.data));
        } else {
            yield put(TAO_LOAI_TAI_NGUYEN_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleMuonThietBi({ type, payload }) {
    try {
        const response = yield call(apiMuonThietBi, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(MUON_THIET_BI_SUCCESS(response.data));
        } else {
            yield put(MUON_THIET_BI_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleTraThietBi({ type, payload }) {
    try {
        const response = yield call(apiTraThietBi, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(TRA_THIET_BI_SUCCESS(response.data));
        } else {
            yield put(TRA_THIET_BI_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleLayPhieuMuon({ type, payload }) {
    try {
        const response = yield call(apiLayPhieuMuon, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_PHIEU_MUON_SUCCESS(response.data));
        } else {
            yield put(LAY_PHIEU_MUON_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* handleLayTaiNguyen({ type, payload }) {
    try {
        const response = yield call(apiLayTaiNguyen, payload);

        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(LAY_TAI_NGUYEN_SUCCESS(response.data));
        } else {
            yield put(LAY_TAI_NGUYEN_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_LOAI_TB().type, handleLayLoaiTB);
    yield takeLatest(TAO_TAI_NGUYEN().type, handleTaoTaiNguyen);
    yield takeLatest(TAO_LOAI_TAI_NGUYEN().type, handleTaoLoaiTaiNguyen);
    yield takeLatest(MUON_THIET_BI().type, handleMuonThietBi);
    yield takeLatest(TRA_THIET_BI().type, handleTraThietBi);
    yield takeLatest(LAY_PHIEU_MUON().type, handleLayPhieuMuon);
    yield takeLatest(LAY_TAI_NGUYEN().type, handleLayTaiNguyen);
}
