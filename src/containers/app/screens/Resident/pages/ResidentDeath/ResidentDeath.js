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
import { KHAI_TU_NK, KHAI_TU_NK_RESET, LAY_NK, LAY_NK_2, LAY_NK_RESET, LAY_NK_RESET_2 } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import AppSelectApi from '~/components/AppSelectApi';

const cx = classNames.bind(styles);

function ResidentDeath(props) {
    const residentDeathInfo = useSelector((state) => state.resident.list2);
    const residentDeath = useSelector((state) => {
        console.log(state);
        return state.resident.khaiTuNK;
    });
    const dispatch = useDispatch();
    const { id } = useParams();

    console.log('residentDeath', residentDeath);

    useEffect(() => {
        dispatch(LAY_NK_RESET_2());
        dispatch(LAY_NK_2({ ids: [id.slice(1)] }));
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
        dispatch(KHAI_TU_NK_RESET());
    }, [residentDeath?.state]);

    const onSubmit = (data) => {
        dispatch(KHAI_TU_NK({ id: id.slice(1), data: data }));
    };
    return (
        <div style={{ width: '50%', minWidth: '500px', margin: '0 auto' }}>
            <div className="page-header flex-center">Khai tử</div>
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
                    defaultValue={moment().format('YYYY-MM-DD')}
                    label="Ngày mất"
                    name="ngay_khai_tu"
                    required
                ></AppDateInput>
                <AppDateInput
                    defaultValue={moment().format('YYYY-MM-DD')}
                    label="Ngày làm đơn"
                    name="ngay_lam_giay"
                    required
                ></AppDateInput>
                {/* <AppInput type="text" label="Người làm giấy" name="nguoi_lam_giay_id" required></AppInput> */}
                <AppSelectApi apiURL="nhanKhau" label="Họ và tên - CCCD người đại diện" name="nguoi_lam_giay_id" />
                <AppInput type="text" label="Quan hệ" name="quan_he" required></AppInput>
                <AppInput type="text" label="Ghi chú" name="ghi_chu" required={false}></AppInput>
                <div style={{ marginTop: '24px' }} className="bottom-right">
                    <AppButton type="submit">Xác nhận</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default ResidentDeath;
