import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppForm from '~/components/AppForm';
import styles from './HouseholdAddResident.module.sass';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import { Row, Col, notification } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHUYEN_HK, NHAP_HK } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function HouseholdAddResident(props) {
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const nhapKhau = useSelector((state) => state.household.nhapHK);

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log('data: ', data);
        dispatch(NHAP_HK(data));
    };

    const addResident = () => {
        setIndexes((prevIndexes) => [...prevIndexes, counter]);
        setCounter((prevCounter) => prevCounter + 1);
    };

    const removeResident = (index) => () => {
        setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
        setCounter((prevCounter) => prevCounter - 1);
    };

    const clearResidents = () => {
        setIndexes([]);
    };

    useEffect(() => {
        if (nhapKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Gửi yêu cầu thành công!',
            });
        }
        if (nhapKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Gửi yêu cầu thất bại!',
            });
        }
    }, [nhapKhau?.state]);

    return (
        <div>
            nhap khau
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={48}>
                    <Col xs={12}>
                        <AppInput type="text" label="Người đại diện" name="donNhapKhau.dai_dien_id" required></AppInput>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="Địa chỉ cơ quan"
                                    name="donNhapKhau.dia_chi_co_quan"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="number"
                                    label="Số hộ khẩu mới"
                                    name="donNhapKhau.so_ho_khau_moi"
                                    required
                                ></AppInput>
                            </Col>
                        </Row>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="Địa chỉ cũ"
                                    name="donNhapKhau.dia_chi_cu"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="Địa chỉ mới"
                                    name="donNhapKhau.dia_chi_moi"
                                    required
                                ></AppInput>
                            </Col>
                        </Row>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppDateInput
                                    label="Ngày làm đơn"
                                    name="donNhapKhau.ngay_lam_don"
                                    required
                                ></AppDateInput>
                            </Col>
                            <Col xs={12}>
                                <AppDateInput
                                    label="Ngày chuyển"
                                    name="donNhapKhau.ngay_chuyen"
                                    required
                                ></AppDateInput>
                            </Col>
                        </Row>
                        <AppTextArea label="Lý do" name="donNhapKhau.ly_do"></AppTextArea>
                        <AppInput
                            type="text"
                            label="Ghi chú đơn chuyển khẩu"
                            name="donNhapKhau.ghi_chu"
                            required={false}
                        ></AppInput>
                    </Col>
                    <Col xs={12}>
                        {indexes.map((index) => {
                            const fieldName = `Residents[${index}]`;
                            return (
                                <div key={index}>
                                    <Row gutter={48}>
                                        <Col xs={12}>
                                            <AppInput
                                                type="number"
                                                label="Nhân khẩu"
                                                name={`donNhapKhauCung[${index}].nhan_khau_id`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={12}>
                                            <AppInput
                                                type="text"
                                                label="Quan hệ chủ hộ"
                                                name={`donNhapKhauCung[${index}].quan_he_chu_ho`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={12}>
                                            <AppInput
                                                type="text"
                                                label="Quan hệ với đại diện"
                                                name={`donNhapKhauCung[${index}].quan_he_dai_dien`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={12}>
                                            <AppInput
                                                type="text"
                                                label="Ghi chú chuyển khẩu cùng"
                                                name={`donNhapKhauCung[${index}].ghi_chu`}
                                                required={false}
                                            ></AppInput>
                                        </Col>
                                        <Col xs={4}>
                                            <AppButton color="orange" type="button" onClick={removeResident(index)}>
                                                Remove
                                            </AppButton>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <AppInput
                                            type="text"
                                            label="Ghi chú chuyển khẩu cùng"
                                            name={`donNhapKhauCung[${index}].ghi_chu`}
                                            required={false}
                                        ></AppInput>
                                    </Row>
                                    <Row>
                                        <AppButton color="orange" type="button" onClick={removeResident(index)}>
                                            Remove
                                        </AppButton>
                                    </Row> */}
                                </div>
                            );
                        })}
                        <AppButton type="button" onClick={addResident}>
                            Add Resident
                        </AppButton>
                        <AppButton type="button" onClick={clearResidents}>
                            Clear All
                        </AppButton>
                    </Col>
                </Row>
                <AppButton type="submit">Thêm</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdAddResident;
