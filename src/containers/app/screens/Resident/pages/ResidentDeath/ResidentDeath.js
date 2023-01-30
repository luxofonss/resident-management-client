import React, { useState } from 'react';
import { Table, Tag, Space, Row, Col, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentDeath.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';
import { KHAI_TU_NK, LAY_NK } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ResidentDeath(props) {
    const residentDeathInfo = useSelector((state) => state.resident.list);
    const residentDeath = useSelector((state) => {
        console.log(state);
        return state.resident.khaiTuNK;
    });
    const dispatch = useDispatch();
    const { id } = useParams();

    console.log('residentDeath', residentDeath);

    useEffect(() => {
        dispatch(LAY_NK({ condition: { id: id.slice(1) } }));
    }, []);

    console.log('residentDeathInfo', residentDeathInfo);

    useEffect(() => {
        if (residentDeath.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Khai tử thành công!',
            });
        }
        if (residentDeath?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Có lỗi xảy ra, vui lòng thử lại sau!',
            });
        }
    }, [residentDeath?.state]);

    const onSubmit = (data) => {
        dispatch(KHAI_TU_NK({ id: id.slice(1), data: data }));
    };
    return (
        <div style={{ width: '50%', minWidth: '500px', margin: '0 auto' }}>
            <AppForm
                onSubmit={(data) => {
                    onSubmit(data);
                }}
            >
                {residentDeathInfo?.data?.data && (
                    <AppInput
                        label="Họ và tên"
                        disable={true}
                        defaultValue={
                            residentDeathInfo?.data?.data[0].ho +
                            ' ' +
                            residentDeathInfo?.data?.data[0].ten_dem +
                            ' ' +
                            residentDeathInfo?.data?.data[0].ten
                        }
                    ></AppInput>
                )}
                <AppDateInput
                    defaultValue={moment().format('YYYY MM DD')}
                    label="Ngày mất"
                    name="ngay_khai_tu"
                    required
                ></AppDateInput>
                <AppDateInput
                    defaultValue={moment().format('YYYY MM DD')}
                    label="Ngày làm đơn"
                    name="ngay_lam_giay"
                    required
                ></AppDateInput>
                <AppInput type="text" label="Người làm giấy" name="nguoi_lam_giay_id" required></AppInput>
                <AppInput type="text" label="Quan hệ" name="quan_he" required></AppInput>
                <AppInput type="text" label="Ghi chú" name="ghi_chu" required={false}></AppInput>
                <AppButton type="submit">Xác nhận</AppButton>
            </AppForm>
        </div>
    );
}

export default ResidentDeath;
