import React, { useEffect } from 'react';
import styles from './AbsentAdd.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, notification, Row } from 'antd';
import moment from 'moment';
import { TAO_TAM_VANG, TAO_TAM_VANG_RESET } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function AbsentAdd(props) {
    const addTamVang = useSelector((state) => state.temporaryAbsent.addTamVang);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(TAO_TAM_VANG(data));
    };

    useEffect(() => {
        if (addTamVang.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Thêm tạm vắng thành công!',
            });
        }
        if (addTamVang?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Thêm tạm vắng thất bại!',
            });
        }
        dispatch(TAO_TAM_VANG_RESET());
    }, [addTamVang?.state]);

    return (
        <div style={{ width: '50%', minWidth: '500px', margin: '0 auto' }}>
            <AppForm onSubmit={onSubmit}>
                <AppInput type="number" label="Họ và tên" name="nhan_khau_id"></AppInput>
                <AppDateInput
                    defaultValue={moment().format('YYYY-MM-DD')}
                    label="Ngày làm đơn"
                    name="ngay_lam_don"
                    required
                ></AppDateInput>
                <AppInput type="text" label="Địa chỉ tạm trú" name="dia_chi_tam_chu" required></AppInput>
                <AppInput type="text" label="Lý do" name="ly_do" required></AppInput>
                <AppInput type="number" label="Sổ hộ khẩu" name="so_ho_khau_id" required></AppInput>
                <AppDateInput label="Ngày hết hạn" name="ngay_het_han" required></AppDateInput>

                <AppButton type="submit">Thêm tạm vắng</AppButton>
            </AppForm>
        </div>
    );
}

export default AbsentAdd;
