import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppForm from '~/components/AppForm';
import styles from './ResidentDelete.module.sass';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import { Row, Col } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHUYEN_HK } from '../../../Household/redux/action';
import { LAY_NK } from '../../redux/action';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

function ResidentDelete(props) {
    const { id } = useParams();
    const residentInfo = useSelector((state) => state.resident.list);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log('data: ', data);
        dispatch(CHUYEN_HK(data));
    };

    console.log('residentInfo', residentInfo);

    useEffect(() => {
        dispatch(LAY_NK({ condition: { id: id.slice(1) } }));
    }, []);

    return (
        <div>
            Xóa nhân khẩu
            {residentInfo.state === 'SUCCESS' ? (
                <AppForm onSubmit={(data) => onSubmit(data)}>
                    <Row gutter={48}>
                        <Col xs={12}>
                            <AppInput
                                type="text"
                                label="Người đại diện"
                                name="donChuyenKhau.dai_dien_id"
                                required
                            ></AppInput>

                            <AppInput
                                defaultValue="in progress"
                                type="number"
                                label="Số hộ khẩu cũ"
                                name="donChuyenKhau.so_ho_khau_cu"
                                required
                            ></AppInput>
                            <Row gutter={24}>
                                <Col xs={12}>
                                    <AppDateInput
                                        label="Ngày chuyển"
                                        name="donChuyenKhau.ngay_chuyen"
                                        required
                                    ></AppDateInput>
                                </Col>
                                <Col xs={12}>
                                    <AppDateInput
                                        defaultValue={moment().format('YYYY MM DD')}
                                        label="Ngày làm đơn"
                                        name="donChuyenKhau.ngay_lam_don"
                                        required
                                    ></AppDateInput>
                                </Col>
                            </Row>
                            <AppTextArea label="Lý do" name="donChuyenKhau.ly_do"></AppTextArea>
                            <AppInput
                                type="text"
                                label="Ghi chú đơn xóa khẩu"
                                name="donChuyenKhau.ghi_chu"
                                required={false}
                            ></AppInput>
                        </Col>
                        <Col xs={12}>
                            <Row gutter={64}>
                                <Col xs={12}>
                                    <AppInput
                                        disabled
                                        type="text"
                                        label="Nhân khẩu"
                                        name={`donChuyenKhauCun.nhan_khau_id`}
                                        required
                                        defaultValue={
                                            residentInfo.data.data[0].ho +
                                            ' ' +
                                            residentInfo.data.data[0].ten_dem +
                                            ' ' +
                                            residentInfo.data.data[0].ten
                                        }
                                    ></AppInput>
                                </Col>
                                <Col xs={12}>
                                    <AppInput
                                        type="text"
                                        label="Quan hệ chủ hộ"
                                        name={`donChuyenKhauCun.quan_he_chu_ho`}
                                        required
                                    ></AppInput>
                                </Col>
                            </Row>
                            <Row>
                                <AppInput
                                    type="text"
                                    label="Ghi chú chuyển khẩu cùng"
                                    name={`donChuyenKhauCun.ghi_chu`}
                                    required={false}
                                ></AppInput>
                            </Row>
                        </Col>
                    </Row>
                    <AppButton type="submit">Xóa nhân khẩu</AppButton>
                </AppForm>
            ) : (
                'LOADING...'
            )}
        </div>
    );
}

export default ResidentDelete;
