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
import InfoDiv from '~/components/InfoDiv';
import { ACCEPT_UPDATE_HK, ACCEPT_UPDATE_HK_RESET, LAY_HK } from '../../../Household/redux/action';
import { LAY_NK } from '../../../Resident/redux/action';
import { ACCEPT_DINH_CHINH_NK, ACCEPT_DINH_CHINH_NK_RESET, LAY_DON } from '../../redux/action';
import styles from './ResidentUpdateDetail.module.sass';

const cx = classNames.bind(styles);

function ResidentUpdateDetail(props) {
    const dispatch = useDispatch();
    const [loadDon, setLoadDon] = useState(false);
    const don = useSelector((state) => state.application.list);
    const nhanKhau = useSelector((state) => state.resident.list);
    const acceptDinhChinhNK = useSelector((state) => state.application.acceptDinhChinhNK);
    const { id } = useParams();

    console.log('nhanKhau', nhanKhau);

    useEffect(() => {
        dispatch(LAY_DON({ type: 'don_dinh_chinh_nhan_khau', id: id }));
    }, []);

    useEffect(() => {
        if (don.state === REQUEST_STATE.SUCCESS) {
            console.log(don.data);
            dispatch(LAY_NK({ id: don.data[0].nhan_khau_id }));
        }
    }, [don.state]);

    useEffect(() => {
        if (acceptDinhChinhNK.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
            dispatch(LAY_DON({ type: 'don_dinh_chinh_nhan_khau', id: id }));
        }
        if (acceptDinhChinhNK?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        dispatch(ACCEPT_DINH_CHINH_NK_RESET());
    }, [acceptDinhChinhNK?.state]);

    const handleAccept = () => {
        dispatch(ACCEPT_DINH_CHINH_NK({ id: id }));
    };

    useEffect(() => {
        document.title = 'Chi tiết đơn đính chính nhân khẩu';
    }, []);
    return (
        <div>
            {don.state === REQUEST_STATE.SUCCESS && nhanKhau.state === REQUEST_STATE.SUCCESS && (
                <Fragment>
                    <AppForm onSubmit={() => {}}>
                        <Row gutter={24}>
                            <Col xs={4}>
                                <AppInput
                                    name="Nhân khẩu"
                                    label="Nhân khẩu"
                                    defaultValue={nhanKhau?.data?.data[0].ten}
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
                                        don?.data[0]?.trang_thai === 'TAO_MOI' ? 'Chờ phê duyệt' : 'Đã phê duyệt'
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
                            {JSON.parse(don?.data[0]?.mo_ta).cu ? (
                                <Fragment>
                                    <div className="second-header">Thông tin cũ</div>
                                    <InfoDiv field="Ngày sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.ngay_sinh} />
                                    <InfoDiv field="CCCD" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.cccd} />
                                    <InfoDiv
                                        field="Nơi cấp CCCD"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.cccd_noi_cap}
                                    />
                                    <InfoDiv
                                        field="Ngày cấp CCCD"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.cccd_ngay_cap}
                                    />
                                    <InfoDiv field="Dân tộc" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.dan_toc} />
                                    <InfoDiv field="Email" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.email} />
                                    <InfoDiv field="Bí danh" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.bi_danh} />
                                    <InfoDiv
                                        field="Nghề nghiệp"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.nghe_nhiep}
                                    />
                                    <InfoDiv
                                        field="Nghề nghiệp"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.nghe_nhiep}
                                    />
                                    <InfoDiv
                                        field="Nguyên quán"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.nguyen_quan}
                                    />
                                    <InfoDiv
                                        field="Nơi làm việc"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.noi_lam_viec}
                                    />
                                    <InfoDiv field="Nơi sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.noi_sinh} />
                                    <InfoDiv field="Nơi sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.noi_sinh} />
                                    <InfoDiv
                                        field="Số điện thoại"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cu.so_dien_thoai}
                                    />
                                    <InfoDiv field="Tôn giáo" value={JSON.parse(don?.data[0]?.mo_ta)?.cu.ton_giao} />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className="second-header">Thông tin cũ</div>
                                    <InfoDiv field="Ngày sinh" value={nhanKhau?.data?.data[0].ngay_sinh} />
                                    <InfoDiv field="CCCD" value={nhanKhau?.data?.data[0].cccd} />
                                    <InfoDiv field="Nơi cấp CCCD" value={nhanKhau?.data?.data[0].cccd_noi_cap} />
                                    <InfoDiv field="Ngày cấp CCCD" value={nhanKhau?.data?.data[0].cccd_ngay_cap} />
                                    <InfoDiv field="Dân tộc" value={nhanKhau?.data?.data[0].dan_toc} />
                                    <InfoDiv field="Email" value={nhanKhau?.data?.data[0].email} />
                                    <InfoDiv field="Bí danh" value={nhanKhau?.data?.data[0].bi_danh} />
                                    <InfoDiv field="Nghề nghiệp" value={nhanKhau?.data?.data[0].nghe_nhiep} />
                                    <InfoDiv field="Nghề nghiệp" value={nhanKhau?.data?.data[0].nghe_nhiep} />
                                    <InfoDiv field="Nguyên quán" value={nhanKhau?.data?.data[0].nguyen_quan} />
                                    <InfoDiv field="Nơi làm việc" value={nhanKhau?.data?.data[0].noi_lam_viec} />
                                    <InfoDiv field="Nơi sinh" value={nhanKhau?.data?.data[0].noi_sinh} />
                                    <InfoDiv field="Nơi sinh" value={nhanKhau?.data?.data[0].noi_sinh} />
                                    <InfoDiv field="Số điện thoại" value={nhanKhau?.data?.data[0].so_dien_thoai} />
                                    <InfoDiv field="Tôn giáo" value={nhanKhau?.data?.data[0].ton_giao} />
                                </Fragment>
                            )}
                        </Col>
                        <Col xs={12}>
                            <div className="second-header">Thông tin thay đổi</div>
                            {JSON.parse(don?.data[0]?.mo_ta).moi ? (
                                <Fragment>
                                    <InfoDiv field="Ngày sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.ngay_sinh} />
                                    <InfoDiv field="CCCD" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.cccd} />
                                    <InfoDiv
                                        field="Nơi cấp CCCD"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.cccd_noi_cap}
                                    />
                                    <InfoDiv
                                        field="Ngày cấp CCCD"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.cccd_ngay_cap}
                                    />
                                    <InfoDiv field="Dân tộc" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.dan_toc} />
                                    <InfoDiv field="Email" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.email} />
                                    <InfoDiv field="Bí danh" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.bi_danh} />
                                    <InfoDiv
                                        field="Nghề nghiệp"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.nghe_nhiep}
                                    />
                                    <InfoDiv
                                        field="Nghề nghiệp"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.nghe_nhiep}
                                    />
                                    <InfoDiv
                                        field="Nguyên quán"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.nguyen_quan}
                                    />
                                    <InfoDiv
                                        field="Nơi làm việc"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.noi_lam_viec}
                                    />
                                    <InfoDiv field="Nơi sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.noi_sinh} />
                                    <InfoDiv field="Nơi sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.noi_sinh} />
                                    <InfoDiv
                                        field="Số điện thoại"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.moi.so_dien_thoai}
                                    />
                                    <InfoDiv field="Tôn giáo" value={JSON.parse(don?.data[0]?.mo_ta)?.moi.ton_giao} />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <InfoDiv field="Ngày sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.ngay_sinh} />
                                    <InfoDiv field="CCCD" value={JSON.parse(don?.data[0]?.mo_ta)?.cccd} />
                                    <InfoDiv
                                        field="Nơi cấp CCCD"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cccd_noi_cap}
                                    />
                                    <InfoDiv
                                        field="Ngày cấp CCCD"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.cccd_ngay_cap}
                                    />
                                    <InfoDiv field="Dân tộc" value={JSON.parse(don?.data[0]?.mo_ta)?.dan_toc} />
                                    <InfoDiv field="Email" value={JSON.parse(don?.data[0]?.mo_ta)?.email} />
                                    <InfoDiv field="Bí danh" value={JSON.parse(don?.data[0]?.mo_ta)?.bi_danh} />
                                    <InfoDiv field="Nghề nghiệp" value={JSON.parse(don?.data[0]?.mo_ta)?.nghe_nhiep} />
                                    <InfoDiv field="Nghề nghiệp" value={JSON.parse(don?.data[0]?.mo_ta)?.nghe_nhiep} />
                                    <InfoDiv field="Nguyên quán" value={JSON.parse(don?.data[0]?.mo_ta)?.nguyen_quan} />
                                    <InfoDiv
                                        field="Nơi làm việc"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.noi_lam_viec}
                                    />
                                    <InfoDiv field="Nơi sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.noi_sinh} />
                                    <InfoDiv field="Nơi sinh" value={JSON.parse(don?.data[0]?.mo_ta)?.noi_sinh} />
                                    <InfoDiv
                                        field="Số điện thoại"
                                        value={JSON.parse(don?.data[0]?.mo_ta)?.so_dien_thoai}
                                    />
                                    <InfoDiv field="Tôn giáo" value={JSON.parse(don?.data[0]?.mo_ta)?.ton_giao} />
                                </Fragment>
                            )}
                        </Col>
                    </Row>
                    {don?.data[0]?.trang_thai !== 'PHE_DUYET' && (
                        <Row>
                            <div style={{ marginTop: '24px' }} className="bottom-right">
                                <AppButton onClick={handleAccept}>Phê duyệt</AppButton>
                            </div>
                        </Row>
                    )}
                </Fragment>
            )}
        </div>
    );
}

export default ResidentUpdateDetail;
