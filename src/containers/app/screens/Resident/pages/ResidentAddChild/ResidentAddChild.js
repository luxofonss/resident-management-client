import React, { useState } from 'react';
import { Table, Tag, Space, Row, Col, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentAddChild.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';
import { KHAI_SINH_NK, KHAI_SINH_NK_RESET, THEM_NK_RESET } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import AppSelectApi from '~/components/AppSelectApi';
import AppSelectInput from '~/components/AppSelectInput';

const cx = classNames.bind(styles);

function ResidentAddChild(props) {
    const addResidentChild = useSelector((state) => {
        console.log(state);
        return state.resident.khaiSinhNK;
    });
    const dispatch = useDispatch();

    console.log('addResidentChild', addResidentChild);

    useEffect(() => {
        if (addResidentChild.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Khai sinh thành công!',
            });
        }
        if (addResidentChild?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Khai sinh thất bại!',
            });
        }
        dispatch(KHAI_SINH_NK_RESET());
    }, [addResidentChild?.state]);

    const onSubmit = (data) => {
        console.log(data);
        let residentData = {};

        residentData.nhanKhauInfo = data.nhanKhauInfo;
        residentData.hokhau = data.hokhau;
        residentData.quanHeChuHo = data.quanHeChuHo;
        residentData.giayKhaiSinh = {
            ...data.giayKhaiSinh,
            ho_khau_id: data.hokhau,
            quan_he: data.quanHeChuHo,
        };
        console.log('residentData', JSON.stringify(residentData));

        dispatch(KHAI_SINH_NK(residentData));
    };
    return (
        <div>
            <div className="flex-center page-header">Khai sinh</div>

            <AppForm
                onSubmit={(data) => {
                    onSubmit(data);
                }}
            >
                <Row gutter={32}>
                    <Col xs={6}>
                        <AppInput type="text" label="Họ" name="nhanKhauInfo.ho" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Tên đệm" name="nhanKhauInfo.ten_dem" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Tên" name="nhanKhauInfo.ten" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppSelectInput
                            options={{
                                options: [
                                    { name: 'Nam', value: 1 },
                                    { name: 'Nữ', value: 0 },
                                ],
                            }}
                            type="text"
                            label="Giới tính"
                            name="nhanKhauInfo.gioi_tinh"
                            required
                        ></AppSelectInput>
                    </Col>
                    {/* <Col xs={6}>
                        <AppInput type="number" label="CCCD" name="nhanKhauInfo.cccd" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppDateInput label="Ngày cấp" name="nhanKhauInfo.cccd_ngay_cap" required></AppDateInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Nơi cấp" name="nhanKhauInfo.cccd_noi_cap" required></AppInput>
                    </Col> */}
                    <Col xs={6}>
                        <AppInput type="text" label="Bí danh" name="nhanKhauInfo.bi_danh" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppDateInput label="Ngày sinh" name="nhanKhauInfo.ngay_sinh" required></AppDateInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Nơi sinh" name="nhanKhauInfo.noi_sinh" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Nguyên quán" name="nhanKhauInfo.nguyen_quan" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Dân tộc" name="nhanKhauInfo.dan_toc" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Tôn giáo" name="nhanKhauInfo.ton_giao" required></AppInput>
                    </Col>
                    {/* <Col xs={6}>
                        <AppInput type="text" label="Nghề nghiệp" name="nhanKhauInfo.nghe_nhiep" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Nơi làm việc" name="nhanKhauInfo.noi_lam_viec" required></AppInput>
                    </Col> */}
                    <Col xs={6}>
                        <AppInput type="text" label="Điện thoại" name="nhanKhauInfo.so_dien_thoai" required></AppInput>
                    </Col>

                    <Col xs={6}>
                        <AppInput type="email" label="Email" name="nhanKhauInfo.email" required={false}></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Số hộ khẩu" name="hokhau" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppSelectApi
                            indexValue={1}
                            apiURL="nhanKhau"
                            label="CCCD - Họ và tên bố"
                            name="giayKhaiSinh.bo_id"
                            required
                        />
                    </Col>

                    <Col xs={6}>
                        <AppSelectApi
                            indexValue={2}
                            apiURL="nhanKhau"
                            label="CCCD - Họ và tên mẹ"
                            name="giayKhaiSinh.me_id"
                            required
                        />
                    </Col>
                    <Col xs={6}>
                        <AppSelectApi
                            indexValue={3}
                            apiURL="nhanKhau"
                            label="CCCD - Họ và tên người khai sinh"
                            name="giayKhaiSinh.nguoi_khai_sinh"
                            required
                        />
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Quan hệ chủ hộ" name="quanHeChuHo" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppDateInput label="Ngày khai sinh" name="giayKhaiSinh.ngay_khai_sinh" required></AppDateInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Nơi đăng ký" name="giayKhaiSinh.noi_dang_ki" required></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput type="text" label="Ghi chú" name="giayKhaiSinh.ghi_chu" required={false}></AppInput>
                    </Col>
                </Row>
                <div style={{ marginTop: '24px' }} className="bottom-right">
                    <AppButton type="submit">Xác nhận</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default ResidentAddChild;
