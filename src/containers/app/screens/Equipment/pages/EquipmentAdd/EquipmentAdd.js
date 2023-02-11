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
        <div>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={48}>
                    {
                        <Col xs={12}>
                            <AppInput required label="Loại thiết bị" name="themTB.loai_id"></AppInput>
                            <AppInput required label="Mô tả" name="themTB.mo_ta"></AppInput>
                            <AppInput required label="Tình trạng" name="themTB.tinh_trang"></AppInput>
                            {/* <AppSelectInput required options={{ options }} label="Select" name="themTB.select"></AppSelectInput> */}
                            <AppTextArea required label="Ghi chú" name="themTB.ghi_chu"></AppTextArea>
                            {/* <button onClick={() => setAddType(false)}>delete type</button> */}
                        </Col>
                    }
                </Row>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default EquipmentAdd;
