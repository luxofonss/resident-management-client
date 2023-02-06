import { delay, put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_STATE } from '~/app-configs';
import { apiLayLoaiTB } from '~/app-data/thietBi';
import { LAY_LOAI_TB, LAY_LOAI_TB_ERROR, LAY_LOAI_TB_SUCCESS } from './action';

function* handleLayLoaiTB({ type, payload }) {
    try {
        const response = yield call(apiLayLoaiTB, payload);

        if (response.status === REQUEST_STATE.SUCCESS) {
            put(LAY_LOAI_TB_SUCCESS(response.data));
        } else {
            put(LAY_LOAI_TB_ERROR());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* () {
    yield takeLatest(LAY_LOAI_TB().type, handleLayLoaiTB);
}
