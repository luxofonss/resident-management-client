import { Col, notification, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import { TAO_LOAI_TAI_NGUYEN, TAO_LOAI_TAI_NGUYEN_RESET, TAO_TAI_NGUYEN } from '../../redux/action';
import styles from './EquipmentAddType.module.sass';

const cx = classNames.bind(styles);

function EquipmentAddType(props) {
    const dispatch = useDispatch();
    const taoLoaiTaiNguyen = useSelector((state) => state.equipment.taoLoaiTaiNguyen);

    const onSubmit = (data) => {
        const submitData = {
            ...data,
            la_cong_trinh: data.la_cong_trinh ? data.la_cong_trinh : false,
        };
        dispatch(TAO_LOAI_TAI_NGUYEN(submitData));
    };

    useEffect(() => {
        if (taoLoaiTaiNguyen.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Tạo loại tài nguyên thành công!',
            });
        }
        if (taoLoaiTaiNguyen?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Tạo loại tài nguyên thất bại!',
            });
        }
        dispatch(TAO_LOAI_TAI_NGUYEN_RESET());
    }, [taoLoaiTaiNguyen?.state]);
    return (
        <div>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={16}>
                    <Col xs={12}>
                        <AppInput required label="Tên thiết bị" name="name"></AppInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput required label="Xuất xứ" name="xuat_xu"></AppInput>
                    </Col>
                </Row>
                <AppInput required label="Mô tả" name="mo_ta"></AppInput>
                <Row gutter={16}>
                    <Col xs={12}>
                        <AppInput type="number" required label="Thu phí" name="thu_phi"></AppInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput type="number" required label="Giá trị" name="gia_tri"></AppInput>
                    </Col>
                </Row>
                <AppInput type="number" required label="Số tiền cọc" name="thu_phi_coc"></AppInput>
                <AppInput required label="Ghi chú" name="ghi_chu"></AppInput>
                <div>
                    <label for="la_cong_trinh">Là công trình</label>
                    <input id="la_cong_trinh" type="checkbox" name="la_cong_trinh"></input>
                </div>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default EquipmentAddType;
