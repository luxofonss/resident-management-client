import React, { useEffect } from 'react';
import styles from './TemporaryAdd.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, notification, Row } from 'antd';
import { TAO_TAM_TRU, TAO_TAM_TRU_RESET } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function TemporaryAdd(props) {
    const addTamTru = useSelector((state) => state.temporaryAbsent.addTamTru);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(TAO_TAM_TRU(data));
    };

    useEffect(() => {
        if (addTamTru.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Thêm tạm trú thành công!',
            });
        }
        if (addTamTru?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Thêm tạm trú thất bại!',
            });
        }
        dispatch(TAO_TAM_TRU_RESET());
    }, [addTamTru?.state]);
    useEffect(() => {
        document.title = 'Thêm tạm trú';
    }, []);
    return (
        <div>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={32}>
                    <Col xs={5}>
                        <AppInput type="text" label="Họ" name="nhanKhau.ho" required></AppInput>
                        <AppInput type="number" label="CCCD" name="nhanKhau.cccd" required></AppInput>
                        <AppInput type="text" label="Bí danh" name="nhanKhau.bi_danh" required></AppInput>
                        <AppInput type="text" label="Nguyên quán" name="nhanKhau.nguyen_quan" required></AppInput>
                        <AppInput type="text" label="Nghề nghiệp" name="nhanKhau.nghe_nhiep" required></AppInput>
                    </Col>
                    <Col xs={5}>
                        <AppInput type="text" label="Tên đệm" name="nhanKhau.ten_dem" required></AppInput>
                        <AppDateInput label="Ngày cấp" name="nhanKhau.cccd_ngay_cap" required></AppDateInput>
                        <AppDateInput label="Ngày sinh" name="nhanKhau.ngay_sinh" required></AppDateInput>
                        <AppInput type="text" label="Dân tộc" name="nhanKhau.dan_toc" required></AppInput>
                        <AppInput type="text" label="Nơi làm việc" name="nhanKhau.noi_lam_viec" required></AppInput>
                    </Col>
                    <Col xs={5}>
                        <AppInput type="text" label="Tên" name="nhanKhau.ten" required></AppInput>
                        <AppInput type="text" label="Nơi cấp" name="nhanKhau.cccd_noi_cap" required></AppInput>
                        <AppInput type="text" label="Nơi sinh" name="nhanKhau.noi_sinh" required></AppInput>
                        <AppInput type="text" label="Tôn giáo" name="nhanKhau.ton_giao" required></AppInput>
                        <Row gutter={8}>
                            <Col xl={12}>
                                <AppInput
                                    type="text"
                                    label="Điện thoại"
                                    name="nhanKhau.so_dien_thoai"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput type="email" label="Email" name="nhanKhau.email" required={false}></AppInput>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <AppDateInput label="Ngày làm đơn" name="donTamTru.ngay_lam_don" required></AppDateInput>
                        <AppDateInput label="Ngày tạm trú" name="donTamTru.ngay_tam_tru" required></AppDateInput>
                        <AppInput type="text" label="Lý do" name="donTamTru.ly_do" required></AppInput>
                    </Col>
                    <Col xs={4}>
                        <AppInput
                            type="text"
                            label="Địa chỉ thường trú"
                            name="donTamTru.dia_chi_thuong_tru"
                            required
                        ></AppInput>
                        <AppInput
                            type="text"
                            label="Địa chỉ tạm trú"
                            name="donTamTru.dia_chi_tam_tru"
                            required
                        ></AppInput>
                        <AppDateInput label="Ngày hết hạn" name="donTamTru.ngay_het_han" required></AppDateInput>
                    </Col>
                </Row>
                <AppButton type="submit">Thêm tạm trú</AppButton>
            </AppForm>
        </div>
    );
}

export default TemporaryAdd;
