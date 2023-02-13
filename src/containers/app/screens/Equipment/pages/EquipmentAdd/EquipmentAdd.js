import React, { useEffect } from 'react';
import styles from './EquipmentAdd.module.sass';
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
import { TAO_TAI_NGUYEN, TAO_TAI_NGUYEN_RESET } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import AppSelectEquipment from '~/components/AppSelectEquipment';

const cx = classNames.bind(styles);

function EquipmentAdd(props) {
    const [addType, setAddType] = useState(false);
    const dispatch = useDispatch();
    const taoTaiNguyen = useSelector((state) => state.equipment.taoTaiNguyen);

    const onSubmit = (data) => {
        dispatch(TAO_TAI_NGUYEN(data));
    };
    useEffect(() => {
        if (taoTaiNguyen.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Tạo loại tài nguyên thành công!',
            });
        }
        if (taoTaiNguyen?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Tạo loại tài nguyên thất bại!',
            });
        }
        dispatch(TAO_TAI_NGUYEN_RESET());
    }, [taoTaiNguyen?.state]);
    return (
        <div style={{ margin: '0 auto', width: '40%' }}>
            <div className="page-header">Thêm tài nguyên</div>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={48}>
                    <Col xs={24}>
                        <AppSelectEquipment label="Loại tài nguyên" name="loai_id" />
                        <AppInput required label="Mô tả" name="mo_ta"></AppInput>
                        <AppInput type="number" required label="Tình trạng" name="tinh_trang"></AppInput>
                        <AppTextArea required label="Ghi chú" name="ghi_chu"></AppTextArea>
                    </Col>
                </Row>
                <div className="bottom-right" style={{ marginTop: '24px' }}>
                    <AppButton type="submit">Submit</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default EquipmentAdd;
