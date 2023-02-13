import { Col, notification, Row } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
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
    const [laCongTrinh, setLaCongTrinh] = useState(false);
    const taoLoaiTaiNguyen = useSelector((state) => state.equipment.taoLoaiTaiNguyen);

    const onSubmit = (data) => {
        const submitData = {
            ...data,
            la_cong_trinh: laCongTrinh,
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
        <div style={{ margin: '0 auto', width: '75%' }}>
            <div className="page-header flex-center">Thêm loại tài nguyên</div>
            <AppForm onSubmit={onSubmit}>
                <Row gutter={[12, 12]}>
                    <Col xs={12}>
                        <AppInput required label="Tên tài nguyên" name="name"></AppInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput required label="Xuất xứ" name="xuat_xu"></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppInput required label="Mô tả" name="mo_ta"></AppInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput type="number" required label="Thu phí" name="thu_phi"></AppInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput type="number" required label="Giá trị" name="gia_tri"></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppInput type="number" required label="Số tiền cọc" name="thu_phi_coc"></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppInput required label="Ghi chú" name="ghi_chu"></AppInput>
                    </Col>
                    <Col xs={24}>
                        <div style={{ marginTop: '24px', display: 'flex', gap: '24px' }}>
                            <input
                                style={{ width: '24px' }}
                                id="la_cong_trinh"
                                type="checkbox"
                                name="la_cong_trinh"
                                onChange={(e) => setLaCongTrinh(e.target.checked)}
                            ></input>
                            <label for="la_cong_trinh">Là công trình</label>
                        </div>
                    </Col>
                    <Col xs={24}>
                        <div className="bottom-right">
                            <AppButton type="submit">Submit</AppButton>
                        </div>
                    </Col>
                </Row>
            </AppForm>
        </div>
    );
}

export default EquipmentAddType;
