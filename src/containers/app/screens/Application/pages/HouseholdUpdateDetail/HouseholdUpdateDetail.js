import { Col, notification, Row } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import { ACCEPT_UPDATE_HK, ACCEPT_UPDATE_HK_RESET, LAY_HK } from '../../../Household/redux/action';
import { LAY_DON, REJECT_DINH_CHINH_KHAU, REJECT_DINH_CHINH_KHAU_RESET } from '../../redux/action';
import styles from './HouseholdUpdateDetail.module.sass';

const cx = classNames.bind(styles);

function HouseholdUpdateDetail(props) {
    const dispatch = useDispatch();
    const [loadDon, setLoadDon] = useState(false);
    const don = useSelector((state) => state.application.list);
    const hoKhau = useSelector((state) => state.household.danhSach);
    const acceptUpdateHK = useSelector((state) => state.household.acceptUpdateHK);
    const rejectDinhChinhKhau = useSelector((state) => state.application.rejectDinhChinhKhau);
    const { id } = useParams();

    console.log('don', don.data);

    useEffect(() => {
        dispatch(LAY_DON({ type: 'don_dinh_chinh_so_ho_khau', id: id }));
    }, []);

    useEffect(() => {
        if (don.state === REQUEST_STATE.SUCCESS) {
            console.log(don.data);
            dispatch(LAY_HK({ id: don.data[0].so_ho_khau_id }));
        }
    }, [don.state]);

    useEffect(() => {
        if (acceptUpdateHK.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
            dispatch(LAY_DON({ type: 'don_dinh_chinh_so_ho_khau', id: id }));
        }
        if (acceptUpdateHK?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        dispatch(ACCEPT_UPDATE_HK_RESET());
    }, [acceptUpdateHK?.state]);

    useEffect(() => {
        if (rejectDinhChinhKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Từ chối thành công!',
            });
            dispatch(LAY_DON({ type: 'don_dinh_chinh_so_ho_khau', id: id }));
        }
        if (rejectDinhChinhKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Từ chối thất bại!',
            });
        }
        dispatch(REJECT_DINH_CHINH_KHAU_RESET());
    }, [rejectDinhChinhKhau?.state]);

    const handleAccept = () => {
        dispatch(ACCEPT_UPDATE_HK({ id: id }));
    };
    const handleReject = () => {
        dispatch(REJECT_DINH_CHINH_KHAU({ id: id }));
    };

    return (
        <div>
            {don.state === REQUEST_STATE.SUCCESS && (
                <Fragment>
                    <AppForm onSubmit={() => {}}>
                        <Row gutter={24}>
                            <Col xs={4}>
                                <AppInput
                                    name="so_ho_khau_id"
                                    label="Sổ hộ khẩu"
                                    defaultValue={don?.data[0]?.so_ho_khau_id}
                                    disabled
                                />
                            </Col>
                            <Col xs={4}>
                                <AppDateInput
                                    name=" ngay_lam_don"
                                    label="Ngày làm đơn"
                                    defaultValue={don?.data[0]?.ngay_lam_don}
                                    disabled
                                ></AppDateInput>
                            </Col>
                            <Col xs={4}>
                                <AppDateInput
                                    name=" ngay_phe_duyet"
                                    label="Ngày phê duyệt"
                                    defaultValue={don?.data[0]?.ngay_phe_duyet}
                                    disabled
                                ></AppDateInput>
                            </Col>
                            <Col xs={4}>
                                <AppInput
                                    name="trang_thai"
                                    label="Trạng thái"
                                    defaultValue={
                                        don?.data[0]?.trang_thai === 'TAO_MOI'
                                            ? 'Chờ phê duyệt'
                                            : don?.data[0]?.trang_thai === 'TU_CHOI'
                                            ? 'Từ chối'
                                            : 'Đã phê duyệt'
                                    }
                                    disabled
                                />
                            </Col>
                            <Col xs={8}>
                                <AppInput
                                    disabled
                                    name="ghi_chu"
                                    label="Ghi chú"
                                    defaultValue={don?.data[0]?.ghi_chu}
                                />
                            </Col>
                        </Row>
                    </AppForm>
                    <Row style={{ marginTop: '24px' }} gutter={36}>
                        <Col xs={12}>
                            <div className="second-header">Thông tin cũ</div>
                            <AppForm>
                                <AppInput
                                    disabled
                                    name="dia_chi"
                                    label="Địa chỉ cũ"
                                    // defaultValue={hoKhau?.data?.data[0].dia_chi}
                                    defaultValue={
                                        JSON.parse(don?.data[0]?.mo_ta).cu
                                            ? JSON.parse(don?.data[0]?.mo_ta).cu.dia_chi
                                            : hoKhau?.data?.data[0].dia_chi
                                    }
                                />
                            </AppForm>
                        </Col>
                        <Col xs={12}>
                            <div className="second-header">Thông tin thay đổi</div>
                            <AppForm>
                                <AppInput
                                    disabled
                                    name="dia_chi"
                                    label="Địa chỉ mới"
                                    value={
                                        JSON.parse(don?.data[0]?.mo_ta).moi
                                            ? JSON.parse(don?.data[0]?.mo_ta).moi.dia_chi
                                            : JSON.parse(don?.data[0]?.mo_ta).dia_chi
                                    }
                                />
                            </AppForm>
                        </Col>
                    </Row>
                    {don?.data[0]?.trang_thai === 'TAO_MOI' && (
                        <Row>
                            <div style={{ marginTop: '24px', gap: '12px' }} className="bottom-right">
                                <AppButton onClick={handleAccept}>Phê duyệt</AppButton>
                                <AppButton onClick={handleReject}>Từ chối</AppButton>
                            </div>
                        </Row>
                    )}
                </Fragment>
            )}
        </div>
    );
}

export default HouseholdUpdateDetail;
