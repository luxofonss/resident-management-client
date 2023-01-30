import React from 'react';
import styles from './AbsentAdd.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, Row } from 'antd';
import moment from 'moment';

const cx = classNames.bind(styles);

function AbsentAdd(props) {
    return (
        <div style={{ width: '50%', minWidth: '500px', margin: '0 auto' }}>
            <AppForm onSubmit={(data) => console.log(data)}>
                <AppInput type="number" label="Họ và tên" name="nhan_khau_id"></AppInput>
                <AppDateInput
                    defaultValue={moment().format('YYYY MM DD')}
                    label="Ngày làm đơn"
                    name="ngay_lam_don"
                    required
                ></AppDateInput>
                <AppInput type="text" label="Địa chỉ tạm trú" name="dia_chi_tam_tru" required></AppInput>
                <AppInput type="text" label="Lý do" name="ly_do" required></AppInput>
                <AppInput type="number" label="Sổ hộ khẩu" name="so_ho_khau_id" required></AppInput>
                <AppDateInput label="Ngày hết hạn" name="ngay_het_han" required></AppDateInput>

                <AppButton type="submit">Thêm tạm vắng</AppButton>
            </AppForm>
        </div>
    );
}

export default AbsentAdd;
