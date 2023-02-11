import React, { useEffect } from 'react';
import styles from './EquipmentBorrow.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, notification, Row } from 'antd';
import { useState } from 'react';
import AppCheckbox from '~/components/AppCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { MUON_THIET_BI, MUON_THIET_BI_RESET } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function EquipmentBorrow(props) {
    const [addType, setAddType] = useState(false);
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const muonThietBi = useSelector((state) => state.equipment.muonThietBi);

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(MUON_THIET_BI(data));
    };

    useEffect(() => {
        if (muonThietBi.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Mượn thiết bị thành công!',
            });
        }
        if (muonThietBi?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Mượn thiết bị thất bại!',
            });
        }
        dispatch(MUON_THIET_BI_RESET());
    }, [muonThietBi?.state]);

    const addEquipment = () => {
        setIndexes((prevIndexes) => [...prevIndexes, counter]);
        setCounter((prevCounter) => prevCounter + 1);
    };

    const removeEquipment = (index) => () => {
        setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
        setCounter((prevCounter) => prevCounter - 1);
    };

    const clearAll = () => {
        setIndexes([]);
    };

    return (
        <div>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={48}>
                    <Col xs={8}>
                        {indexes.map((index) => {
                            return (
                                <div>
                                    <AppInput
                                        type="text"
                                        name={`phieuSuDung[${index}].tai_nguyen_id`}
                                        label="Loại tài nguyên"
                                    />
                                    <AppInput name={`phieuSuDung[${index}].mo_ta`} label="Mô tả" />
                                    <AppDateInput name={`phieuSuDung[${index}].ngay_muon`} label="Ngày mượn" />
                                    <AppDateInput name={`phieuSuDung[${index}].ngay_hen_tra`} label="Ngày hẹn trả" />
                                    <AppInput name={`phieuSuDung[${index}].ghi_chu`} label="Ghi chú" />
                                    <AppButton color="orange" type="button" onClick={removeEquipment(index)}>
                                        Remove
                                    </AppButton>
                                </div>
                            );
                        })}
                        <AppButton type="button" onClick={addEquipment}>
                            Thêm tài nguyên
                        </AppButton>
                        <AppButton type="button" onClick={clearAll}>
                            Xóa tất cả
                        </AppButton>
                    </Col>
                    <Col xs={8}>
                        <AppInput name="phieuMuon.cccd" label="CCCD" />
                        <AppInput name="phieuMuon.ho_va_ten" label="Họ và tên" />
                        <AppInput type="number" name="phieuMuon.so_dien_thoai" label="Số điện thoại" />
                        <AppInput type="email" name="phieuMuon.email" label="Email" />
                        <AppInput type="text" name="phieuMuon.ly_do" label="Lý do" />
                    </Col>
                    <Col xs={8}>
                        <AppInput type="number" name="saoKe.tien_thu" label="Tiền thu" />
                        <AppInput type="number" name="saoKe.tien_tra" label="Tiền trả" />
                        <AppInput type="number" name="saoKe.tien_thoi" label="Tiền thối" />
                        <AppInput type="number" name="saoKe.user_thu" label="Người thu" />
                        <AppDateInput type="number" name="saoKe.ngay_gio" label="Ngày thu" />
                    </Col>
                </Row>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default EquipmentBorrow;
