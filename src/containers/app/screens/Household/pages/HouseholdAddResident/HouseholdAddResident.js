import classNames from 'classnames/bind';
import React, { Fragment, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { LAY_NK, LAY_NK_2 } from '../../../Resident/redux/action';
import AppSelectApi from '~/components/AppSelectApi';

const cx = classNames.bind(styles);

function HouseholdAddResident(props) {
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const nhapKhau = useSelector((state) => state.household.nhapHK);
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list2;
    });

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log('data: ', data);
        if (!id) dispatch(NHAP_HK(data));
        else {
            let submitData = {
                donNhapKhau: data.donNhapKhau,
                donNhapKhauCung: [{ ...data.donNhapKhauCung[0], nhan_khau_id: id }],
            };
            dispatch(NHAP_HK(submitData));
        }
    };

    const { id } = useParams();

    console.log('id', id);

    useEffect(() => {
        dispatch(LAY_NK_2({ ids: id }));
    }, [id]);

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

    console.log('danhSachNhanKhau', danhSachNhanKhau);
    return (
        <div>
            nhap khau
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={48}>
                    <Col xs={12}>
                        <AppSelectApi
                            apiURL="nhanKhau"
                            label="Họ và tên - CCCD người đại diện"
                            name="donNhapKhau.dai_dien_id"
                        />

                        {/* <AppInput type="text" label="Người đại diện" name="donNhapKhau.dai_dien_id" required></AppInput> */}
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
                                    name="donNhapKhau.so_ho_khau_moi_id"
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
                                        {id && (
                                            <Col xs={12}>
                                                <AppInput
                                                    type="text"
                                                    label="Nhân khẩu"
                                                    defaultValue={
                                                        danhSachNhanKhau?.data?.data[0]?.ho +
                                                        ' ' +
                                                        danhSachNhanKhau?.data?.data[0]?.ten_dem +
                                                        ' ' +
                                                        danhSachNhanKhau?.data?.data[0]?.ten
                                                    }
                                                    name={`donNhapKhauCung[${index}].nhan_khau_id`}
                                                    required
                                                ></AppInput>
                                            </Col>
                                        )}
                                        {!id && (
                                            <Col xs={12}>
                                                <AppInput
                                                    type="number"
                                                    label="Nhân khẩu"
                                                    name={`donNhapKhauCung[${index}].nhan_khau_id`}
                                                    required
                                                ></AppInput>
                                            </Col>
                                        )}
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
                                        {!id && (
                                            <Col xs={4}>
                                                <AppButton color="orange" type="button" onClick={removeResident(index)}>
                                                    Remove
                                                </AppButton>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                            );
                        })}
                        {!id && (
                            <Fragment>
                                <AppButton type="button" onClick={addResident}>
                                    Add Resident
                                </AppButton>
                                <AppButton type="button" onClick={clearResidents}>
                                    Clear All
                                </AppButton>
                            </Fragment>
                        )}
                    </Col>
                </Row>
                <AppButton type="submit">Thêm</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdAddResident;
