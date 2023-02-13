import React, { Fragment, useEffect, useState } from 'react';
import styles from './AbsentAdd.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, notification, Row } from 'antd';
import moment from 'moment';
import { TAO_TAM_VANG, TAO_TAM_VANG_RESET } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import AppInputSearch from '~/components/AppInputSearch';
import { LAY_NK, LAY_NK_FAIL, LAY_NK_RESET } from '../../../Resident/redux/action';
import useDebounceValue from '~/hooks/useDebounceValue';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function AbsentAdd(props) {
    const addTamVang = useSelector((state) => state.temporaryAbsent.addTamVang);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(TAO_TAM_VANG({ ...data, nhan_khau_id: nhanKhau.data.data[0].id }));
    };
    const currentRouter = useSelector((state) => state.router.location);
    const nhanKhau = useSelector((state) => state.resident.list);
    const searchParams = new URLSearchParams(currentRouter.search);

    console.log('searchParams', searchParams.get('id'));

    useEffect(() => {
        dispatch(LAY_NK({ ids: searchParams.get('id') }));
    }, []);

    useEffect(() => {
        if (addTamVang.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Thêm tạm vắng thành công!',
            });
        }
        if (addTamVang?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Thêm tạm vắng thất bại!',
            });
        }
        dispatch(TAO_TAM_VANG_RESET());
    }, [addTamVang?.state]);

    useEffect(() => {
        document.title = 'Thêm tạm vắng';
    }, []);

    return (
        <div style={{ width: '50%', minWidth: '450px', margin: '0 auto' }}>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={(24, 12)}>
                    {nhanKhau.state === 'SUCCESS' ? (
                        <Fragment>
                            <Col xs={24}>
                                <AppInput
                                    type="number"
                                    label="ID người tạm vắng"
                                    // name="nhan_khau_id"
                                    value={nhanKhau.data.data[0].id}
                                    // required
                                    disabled
                                ></AppInput>
                            </Col>
                            <Col xs={24}>
                                <AppInput
                                    label="Họ và tên"
                                    // name="nhan_khau_id"
                                    value={
                                        nhanKhau.data.data[0].ho +
                                        ' ' +
                                        nhanKhau.data.data[0].ten_dem +
                                        ' ' +
                                        nhanKhau.data.data[0].ten
                                    }
                                    disabled
                                ></AppInput>
                            </Col>
                        </Fragment>
                    ) : (
                        <Col xs={24}>
                            <AppInput type="number" label="ID người tạm vắng" name="nhan_khau_id" required></AppInput>
                        </Col>
                    )}
                    <Col xs={24}>
                        <AppDateInput
                            defaultValue={moment().format('YYYY-MM-DD')}
                            label="Ngày làm đơn"
                            name="ngay_lam_don"
                            required
                        ></AppDateInput>
                    </Col>
                    <Col xs={24}>
                        <AppInput type="text" label="Địa chỉ tạm trú" name="dia_chi_tam_chu" required></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppInput type="text" label="Lý do" name="ly_do" required></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppInput type="number" label="Sổ hộ khẩu" name="so_ho_khau_id" required></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppDateInput label="Ngày hết hạn" name="ngay_het_han" required></AppDateInput>
                    </Col>
                </Row>

                <div style={{ marginTop: '24px' }} className="bottom-right">
                    <AppButton type="submit">Thêm tạm vắng</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default AbsentAdd;
