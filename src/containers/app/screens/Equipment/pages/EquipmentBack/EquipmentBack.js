import { Col, notification, Row } from 'antd';
import classNames from 'classnames/bind';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import { isEmptyValue } from '~/helpers/check';
import {
    LAY_LOAI_TB,
    LAY_PHIEU_MUON,
    MUON_THIET_BI,
    MUON_THIET_BI_RESET,
    TRA_TAI_NGUYEN,
    TRA_TAI_NGUYEN_RESET,
} from '../../redux/action';
import styles from './EquipmentBack.module.sass';

const cx = classNames.bind(styles);

function EquipmentBack(props) {
    const [addType, setAddType] = useState(false);
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const traTaiNguyen = useSelector((state) => state.equipment.traTaiNguyen);
    const currentRouter = useSelector((state) => state.router.location);
    const loaiTaiNguyen = useSelector((state) => state.equipment.danhSachLoaiThietBi);
    const phieuMuon = useSelector((state) => state.equipment.layPhieuMuon);

    console.log('currentRouter', currentRouter.search);

    const searchParams = new URLSearchParams(currentRouter.search);

    const dispatch = useDispatch();

    useEffect(() => {
        if (traTaiNguyen.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Trả tài nguyên thành công!',
            });
        }
        if (traTaiNguyen?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Trả tài nguyên thất bại!',
            });
        }
        dispatch(TRA_TAI_NGUYEN_RESET());
    }, [traTaiNguyen?.state]);

    const params = useParams();

    useEffect(() => {
        dispatch(LAY_PHIEU_MUON({ id: params.id }));
        dispatch(LAY_LOAI_TB({ id: searchParams.getAll('ids') }));
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        console.log('tést  ');
        dispatch(TRA_TAI_NGUYEN(data));
    };

    return (
        <div>
            <div className="page-header">Trả tài nguyên</div>

            <AppForm onSubmit={onSubmit}>
                <Row gutter={16}>
                    <Col xs={24}>
                        {phieuMuon.state === 'SUCCESS' && (
                            <Row gutter={16}>
                                <Col xs={2}>
                                    <AppInput
                                        name="phieuMuonId"
                                        label="ID"
                                        defaultValue={phieuMuon.data[0].id}
                                        disabled
                                    />
                                </Col>
                                <Col xs={5}>
                                    <AppInput type="number" name="saoKe.tien_thu" label="Tiền thu" required />
                                </Col>
                                <Col xs={5}>
                                    <AppInput type="number" name="saoKe.tien_tra" label="Tiền trả" required />
                                </Col>
                                <Col xs={5}>
                                    <AppInput type="number" name="saoKe.tien_thoi" label="Tiền thối" required />
                                </Col>
                                <Col xs={5}>
                                    <AppInput type="number" name="saoKe.user_thu" label="Người thu" required />
                                </Col>
                                <Col xs={4}>
                                    <AppDateInput type="number" name="saoKe.ngay_gio" label="Ngày thu" required />
                                </Col>
                                <Col xs={4}>
                                    <AppDateInput type="number" name="ngayTra" label="Ngày trả" required />
                                </Col>
                            </Row>
                        )}
                    </Col>
                    <div className="second-header">Loại tài nguyên mượn</div>
                    <Col xs={24}>
                        {loaiTaiNguyen.state === 'SUCCESS' &&
                            loaiTaiNguyen.data.map((tb, index) => {
                                return (
                                    <div style={{ marginBottom: '24px' }}>
                                        <Row gutter={16}>
                                            <Col xs={2}>
                                                <AppInput
                                                    name={`note[${index}].taiNguyenId`}
                                                    label="ID"
                                                    defaultValue={tb.id}
                                                    disabled
                                                />
                                            </Col>
                                            <Col xs={5}>
                                                <AppInput label="Loại tài nguyên" defaultValue={tb.name} disabled />
                                            </Col>
                                            <Col xs={4}>
                                                <AppInput
                                                    type="number"
                                                    name={`note[${index}].tinh_trang`}
                                                    label="Tình trạng"
                                                    required
                                                />
                                            </Col>
                                            <Col xs={5}>
                                                <AppInput name={`note[${index}].mo_ta`} label="Mô tả" required />
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })}
                    </Col>
                    <AppButton type="submit">Submit</AppButton>
                </Row>
            </AppForm>
        </div>
    );
}

export default EquipmentBack;
