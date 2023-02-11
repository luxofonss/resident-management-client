import React, { useState } from 'react';
import { Table, Tag, Space, Row, Col, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentAdd.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';
import { THEM_NK, THEM_NK_RESET } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function ResidentAdd(props) {
    const addResident = useSelector((state) => {
        console.log(state);
        return state.resident.themNK;
    });
    const dispatch = useDispatch();

    console.log('addResident', addResident);

    useEffect(() => {
        if (addResident.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Thêm nhân khẩu thành công!',
            });
        }
        if (addResident?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Thêm nhân khẩu thất bại!',
            });
        }
        dispatch(THEM_NK_RESET());
    }, [addResident?.state]);

    const onSubmit = (data) => {
        dispatch(THEM_NK(data));
    };
    return (
        <div>
            <div className="flex-center page-header">Thêm nhân khẩu</div>
            <AppForm
                onSubmit={(data) => {
                    console.log(data);
                    onSubmit(data);
                }}
            >
                <Row gutter={[32, 12]}>
                    <Col xs={8}>
                        <AppInput type="text" label="Họ" name="nhanKhauInfo.ho" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Tên đệm" name="nhanKhauInfo.ten_dem" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Tên" name="nhanKhauInfo.ten" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="number" label="CCCD" name="nhanKhauInfo.cccd" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppDateInput label="Ngày cấp" name="nhanKhauInfo.cccd_ngay_cap" required></AppDateInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Nơi cấp" name="nhanKhauInfo.cccd_noi_cap" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Bí danh" name="nhanKhauInfo.bi_danh" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppDateInput label="Ngày sinh" name="nhanKhauInfo.ngay_sinh" required></AppDateInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Nơi sinh" name="nhanKhauInfo.noi_sinh" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Nguyên quán" name="nhanKhauInfo.nguyen_quan" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Dân tộc" name="nhanKhauInfo.dan_toc" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Tôn giáo" name="nhanKhauInfo.ton_giao" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Nghề nghiệp" name="nhanKhauInfo.nghe_nhiep" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <AppInput type="text" label="Nơi làm việc" name="nhanKhauInfo.noi_lam_viec" required></AppInput>
                    </Col>
                    <Col xs={8}>
                        <Row gutter={8}>
                            <Col xl={12}>
                                <AppInput
                                    type="text"
                                    label="Điện thoại"
                                    name="nhanKhauInfo.so_dien_thoai"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="email"
                                    label="Email"
                                    name="nhanKhauInfo.email"
                                    required={false}
                                ></AppInput>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div style={{ marginTop: '24px' }} className="bottom-right">
                    <AppButton type="submit">Xác nhận</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default ResidentAdd;
