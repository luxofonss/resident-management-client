import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';
import AppForm from '~/components/AppForm';
import styles from './HouseholdMove.module.sass';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import { Row, Col } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHUYEN_HK } from '../../redux/action';

const cx = classNames.bind(styles);

function HouseholdMove(props) {
    const [indexes, setIndexes] = React.useState([1]);
    const [counter, setCounter] = React.useState(0);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log('data: ', data);
        dispatch(CHUYEN_HK(data));
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

    return (
        <div>
            chuyen ho khau
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={48}>
                    <Col xs={12}>
                        <AppInput
                            type="text"
                            label="Người đại diện"
                            name="donChuyenKhau.dai_dien_id"
                            required
                        ></AppInput>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppInput
                                    type="number"
                                    label="Số hộ khẩu cũ"
                                    name="donChuyenKhau.so_ho_khau_cu"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="number"
                                    label="Số hộ khẩu mới"
                                    name="donChuyenKhau.so_ho_khau_moi"
                                    required
                                ></AppInput>
                            </Col>
                        </Row>
                        <AppDateInput label="Ngày chuyển" name="donChuyenKhau.ngay_chuyen" required></AppDateInput>
                        <AppDateInput label="Ngày làm đơn" name="donChuyenKhau.ngay_lam_don" required></AppDateInput>
                        <AppTextArea label="Lý do" name="donChuyenKhau.ly_do"></AppTextArea>
                        <AppInput
                            type="text"
                            label="Ghi chú đơn chuyển khẩu"
                            name="donChuyenKhau.ghi_chu"
                            required={false}
                        ></AppInput>
                    </Col>
                    <Col xs={12}>
                        {indexes.map((index) => {
                            const fieldName = `Residents[${index}]`;
                            return (
                                <div>
                                    <Row gutter={64}>
                                        <Col xs={12}>
                                            <AppInput
                                                type="number"
                                                label="Nhân khẩu"
                                                name={`donChuyenKhauCung[${index}].nhan_khau_id`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={12}>
                                            <AppInput
                                                type="text"
                                                label="Quan hệ chủ hộ"
                                                name={`donChuyenKhauCung[${index}].quan_he_chu_ho`}
                                                required
                                            ></AppInput>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <AppInput
                                            type="text"
                                            label="Ghi chú chuyển khẩu cùng"
                                            name={`donChuyenKhauCung[${index}].ghi_chu`}
                                            required={false}
                                        ></AppInput>
                                    </Row>
                                    <Row>
                                        <AppButton color="orange" type="button" onClick={removeResident(index)}>
                                            Remove
                                        </AppButton>
                                    </Row>
                                </div>
                            );
                        })}
                        <AppButton type="button" onClick={addResident}>
                            Add Resident
                        </AppButton>
                        <AppButton type="button" onClick={clearResidents}>
                            Clear Residents
                        </AppButton>
                    </Col>
                </Row>
                <AppButton type="submit">Thêm</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdMove;
