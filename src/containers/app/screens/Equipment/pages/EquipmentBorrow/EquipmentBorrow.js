import React, { Fragment, useEffect } from 'react';
import styles from './EquipmentBorrow.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Button, Col, notification, Row } from 'antd';
import { useState } from 'react';
import AppCheckbox from '~/components/AppCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { LAY_LOAI_TB, MUON_THIET_BI, MUON_THIET_BI_RESET } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import AppSelectEquipment from '~/components/AppSelectEquipment';
import { IconPlus, IconX } from '~/assets/svgs';
import { isEmptyValue } from '~/helpers/check';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function EquipmentBorrow(props) {
    const [addType, setAddType] = useState(false);
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const muonThietBi = useSelector((state) => state.equipment.muonThietBi);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(LAY_LOAI_TB({ id: id }));
    }, []);

    const onSubmit = (data) => {
        let phienSuDungSubmit = [];
        data.phienSuDung.forEach((phien) => {
            if (phien.id !== '' && phien.ngay_muon && phien.ngay_hen_tra && !isEmptyValue(phien.so_luong)) {
                for (let i = 1; i <= phien.so_luong; i++) {
                    phienSuDungSubmit.push({
                        tai_nguyen_id: id,
                        mo_ta: phien.mo_ta,
                        ngay_muon: phien.ngay_muon,
                        ngay_hen_tra: phien.ngay_hen_tra,
                        ghi_chu: phien.ghi_chu,
                    });
                }
                // phienSuDungSubmit.push(phien);
            }
        });

        dispatch(MUON_THIET_BI({ ...data, phienSuDung: phienSuDungSubmit }));
    };

    useEffect(() => {
        if (muonThietBi.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Mượn tài nguyên thành công!',
            });
        }
        if (muonThietBi?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Mượn tài nguyên thất bại!',
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

    useEffect(() => {
        document.title = 'Mượn tài nguyên';
    }, []);

    return (
        <div>
            <div className="page-header">Mượn tài nguyên</div>

            <AppForm onSubmit={onSubmit}>
                <Row gutter={16}>
                    <Col xs={4}>
                        <AppInput type="number" name="phieuMuon.cccd" label="CCCD" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput name="phieuMuon.ho_va_ten" label="Họ và tên" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput type="number" name="phieuMuon.so_dien_thoai" label="Số điện thoại" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput type="email" name="phieuMuon.email" label="Email" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput type="text" name="phieuMuon.ly_do" label="Lý do" required />
                    </Col>
                    <Col xs={4}>
                        <AppInput type="number" name="saoKe.tien_thu" label="Tiền thu" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput type="number" name="saoKe.tien_tra" label="Tiền trả" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput type="number" name="saoKe.tien_thoi" label="Tiền thối" required />
                    </Col>
                    <Col xs={5}>
                        <AppInput type="number" name="saoKe.user_thu" label="Người thu" required />
                    </Col>
                    <Col xs={5}>
                        <AppDateInput type="number" name="saoKe.ngay_gio" label="Ngày thu" required />
                    </Col>
                    <div className="second-header">Loại tài nguyên mượn</div>
                    <Col xs={24}>
                        {indexes.map((index) => {
                            return (
                                <div style={{ marginBottom: '24px' }}>
                                    <Row gutter={16}>
                                        <Col xs={2}>
                                            {/* <AppSelectEquipment
                                                label="Loại tài nguyên"
                                                name={`phienSuDung[${index}].tai_nguyen_id`}
                                                required
                                            /> */}
                                            <AppInput
                                                // name={`phienSuDung[${index}].tai_nguyen_id`}
                                                label="ID"
                                                value={id}
                                                // required
                                                disabled
                                            />
                                        </Col>
                                        {/* <Col xs={2}>
                                            <AppInput
                                                // name={`phienSuDung[${index}].tai_nguyen_id`}
                                                label="Tên tài nguyên"
                                                // required
                                                disabled
                                            />
                                        </Col> */}
                                        <Col xs={5}>
                                            <AppInput name={`phienSuDung[${index}].mo_ta`} label="Mô tả" required />
                                        </Col>
                                        <Col xs={4}>
                                            <AppDateInput
                                                name={`phienSuDung[${index}].ngay_muon`}
                                                label="Ngày mượn"
                                                required
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <AppDateInput
                                                name={`phienSuDung[${index}].ngay_hen_tra`}
                                                label="Ngày hẹn trả"
                                                required
                                            />
                                        </Col>
                                        <Col xs={5}>
                                            <AppInput name={`phienSuDung[${index}].ghi_chu`} label="Ghi chú" />
                                        </Col>
                                        <Col xs={4}>
                                            <AppInput
                                                type="number"
                                                name={`phienSuDung[${index}].so_luong`}
                                                label="Số lượng"
                                            />
                                        </Col>
                                        <Col xs={1}>
                                            <div
                                                onClick={removeEquipment(index)}
                                                className="action-wrapper bottom-right"
                                            >
                                                {/* <div className="action-icon">
                                                    <IconX width={18} height={18} />
                                                </div> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                        {/* <AppButton type="button" onClick={addEquipment}>
                            Thêm tài nguyên
                        </AppButton>
                        <AppButton type="button" onClick={clearAll}>
                            Xóa tất cả
                        </AppButton> */}
                        {/* <Fragment>
                            <div className="flex-right">
                                <div style={{ marginTop: '18px' }} onClick={addEquipment} className="action-wrapper">
                                    <div className="action-icon">
                                        <IconPlus />
                                    </div>
                                </div>
                                <Button danger onClick={clearAll}>
                                    Clear All
                                </Button>
                            </div>
                        </Fragment> */}
                    </Col>
                    {/* <Col xs={8}>
                        <AppInput name="phieuMuon.cccd" label="CCCD" required />
                        <AppInput name="phieuMuon.ho_va_ten" label="Họ và tên" required />
                        <AppInput type="number" name="phieuMuon.so_dien_thoai" label="Số điện thoại" required />
                        <AppInput type="email" name="phieuMuon.email" label="Email" required />
                        <AppInput type="text" name="phieuMuon.ly_do" label="Lý do" required />
                    </Col> */}
                    {/* <Col xs={8}>
                        <AppInput type="number" name="saoKe.tien_thu" label="Tiền thu" required />
                        <AppInput type="number" name="saoKe.tien_tra" label="Tiền trả" required />
                        <AppInput type="number" name="saoKe.tien_thoi" label="Tiền thối" required />
                        <AppInput type="number" name="saoKe.user_thu" label="Người thu" required />
                        <AppDateInput type="number" name="saoKe.ngay_gio" label="Ngày thu" required />
                    </Col> */}
                </Row>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default EquipmentBorrow;
