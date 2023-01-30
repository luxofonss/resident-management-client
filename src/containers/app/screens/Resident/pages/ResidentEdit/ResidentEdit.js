import React, { useState } from 'react';
import { Table, Tag, Space, Row, Col, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentEdit.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';
import { LAY_NK, THEM_NK, CAP_NHAT_NK } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

function ResidentEdit(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const residentInfo = useSelector((state) => state.resident.list);
    const residentUpdate = useSelector((state) => state.resident.capNhatNK);

    let updateData = {};
    const onSubmit = (data) => {
        updateData.nhan_khau_id = id.slice(1);
        updateData.ghi_chu = data.ghi_chu;
        updateData.ngay_lam_don = data.ngay_lam_don;
        updateData.mo_ta = data.mo_ta;
        console.log(updateData);
        dispatch(CAP_NHAT_NK(updateData));
    };

    useEffect(() => {
        if (residentUpdate.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Gửi yêu cầu đính chính nhân khẩu thành công!',
            });
        }
        if (residentUpdate?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Gửi yêu cầu thất bại!',
            });
        }
    }, [residentUpdate?.state]);

    useEffect(() => {
        dispatch(LAY_NK({ condition: { id: id.slice(1) } }));
    }, []);
    return (
        <div>
            <div
                onClick={() => {
                    history.push('/resident/list');
                }}
            >
                quay lai
            </div>
            {residentInfo.data && (
                <AppForm
                    onSubmit={(data) => {
                        onSubmit(data);
                    }}
                >
                    <Row gutter={32}>
                        <Col xl={8}>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].ho}
                                type="text"
                                label="Họ"
                                name="mo_ta.ho"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].cccd}
                                type="number"
                                label="CCCD"
                                name="mo_ta.cccd"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].bi_danh}
                                type="text"
                                label="Bí danh"
                                name="mo_ta.bi_danh"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].nguyen_quan}
                                type="text"
                                label="Nguyên quán"
                                name="mo_ta.nguyen_quan"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].nghe_nhiep}
                                type="text"
                                label="Nghề nghiệp"
                                name="mo_ta.nghe_nhiep"
                                required
                            ></AppInput>
                        </Col>
                        <Col xl={8}>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].ten_dem}
                                type="text"
                                label="Tên đệm"
                                name="mo_ta.ten_dem"
                                required
                            ></AppInput>
                            <AppDateInput
                                defaultValue={residentInfo.data.data[0].ngay_cap?.slice(0, 10)}
                                label="Ngày cấp"
                                name="mo_ta.cccd_ngay_cap"
                                required
                            ></AppDateInput>
                            <AppDateInput
                                defaultValue={residentInfo.data.data[0].ngay_sinh?.slice(0, 10)}
                                label="Ngày sinh"
                                name="mo_ta.ngay_sinh"
                                required
                            ></AppDateInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].dan_toc}
                                type="text"
                                label="Dân tộc"
                                name="mo_ta.dan_toc"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].noi_lam_viec}
                                type="text"
                                label="Nơi làm việc"
                                name="mo_ta.noi_lam_viec"
                                required
                            ></AppInput>
                        </Col>
                        <Col xl={8}>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].ten}
                                type="text"
                                label="Tên"
                                name="mo_ta.ten"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].cccd_noi_cap}
                                type="text"
                                label="Nơi cấp"
                                name="mo_ta.cccd_noi_cap"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].noi_sinh}
                                type="text"
                                label="Nơi sinh"
                                name="mo_ta.noi_sinh"
                                required
                            ></AppInput>
                            <AppInput
                                defaultValue={residentInfo.data.data[0].ton_giao}
                                type="text"
                                label="Tôn giáo"
                                name="mo_ta.ton_giao"
                                required
                            ></AppInput>
                            <Row gutter={8}>
                                <Col xl={12}>
                                    <AppInput
                                        defaultValue={residentInfo.data.data[0].so_dien_thoai}
                                        type="text"
                                        label="Điện thoại"
                                        name="mo_ta.so_dien_thoai"
                                        required
                                    ></AppInput>
                                </Col>
                                <Col xs={12}>
                                    <AppInput
                                        defaultValue={residentInfo.data.data[0].email}
                                        type="email"
                                        label="Email"
                                        name="mo_ta.email"
                                        required={false}
                                    ></AppInput>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={8}>
                            <AppInput type="text" label="Ghi chú" name="ghi_chu" required={false}></AppInput>
                        </Col>
                        <Col xs={8}>
                            <AppDateInput
                                defaultValue={moment().format('YYYY MM DD')}
                                label="Ngày làm đơn"
                                name="ngay_lam_don"
                                required
                            ></AppDateInput>
                        </Col>
                    </Row>
                    <AppButton type="submit">Cập nhật</AppButton>
                </AppForm>
            )}
        </div>
    );
}

export default ResidentEdit;
