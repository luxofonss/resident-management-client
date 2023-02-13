import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './HouseholdSeparate.module.sass';
import AppInput from '~/components/AppInput';
import { Col, notification, Row } from 'antd';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import AppButton from '~/components/AppButton/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { LAY_HK, LAY_HK_RESET, TACH_HK, TACH_HK_RESET } from '../../redux/action';
import AppInputSearch from '~/components/AppInputSearch';
import { LAY_NK_2, LAY_NK_RESET_2 } from '../../../Resident/redux/action';
import AppCheckbox from '~/components/AppCheckbox';
import useDebounceValue from '~/hooks/useDebounceValue';
import AppSelectApi from '~/components/AppSelectApi';
import { isEmptyValue } from '~/helpers/check';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function HouseholdSeparate(props) {
    const [nhanKhau, setNhanKhau] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [counter, setCounter] = useState(0);
    const [soHoKhau, setSoHoKhau] = useState('');
    const searchValue = useDebounceValue(soHoKhau, 1000);
    const hoKhauInfo = useSelector((state) => {
        console.log(state);
        return state.household?.danhSach;
    });
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list2;
    });
    const tachKhau = useSelector((state) => state.household.tachHK);

    const dispatch = useDispatch();

    useEffect(() => {
        if (tachKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Gửi yêu cầu thành công!',
            });
        }
        if (tachKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Gửi yêu cầu thất bại!',
            });
        }
        dispatch(TACH_HK_RESET());
    }, [tachKhau?.state]);

    useEffect(() => {
        setNhanKhau(danhSachNhanKhau?.data?.data);
    }, [danhSachNhanKhau?.data?.data]);

    const onSubmit = (data) => {
        let submitData;
        let submitDonTachKhauCung = [];

        data.donTachKhauCung.map((don) => {
            if (don.isChosen === true) {
                submitDonTachKhauCung.push({
                    nhan_khau_id: parseInt(don.nhan_khau_id),
                    quan_he: don.quan_he,
                    ghi_chu: don.ghi_chu,
                });
            }
        });
        submitData = {
            donTachKhau: { ...data.donTachKhau, so_ho_khau_cu: searchValue },
            donTachKhauCung: submitDonTachKhauCung,
        };

        console.log('submitData', submitData);
        dispatch(TACH_HK(submitData));
    };

    const onChange = (e) => {
        console.log(e.target.value);
        setSoHoKhau(e.target.value);
    };

    useEffect(() => {
        dispatch(LAY_HK_RESET());
        dispatch(LAY_NK_RESET_2());
    }, []);

    useEffect(() => {
        if (!isEmptyValue(searchValue)) dispatch(LAY_HK({ id: searchValue }));
        else {
            dispatch(LAY_NK_RESET_2());

            dispatch(LAY_HK_RESET());
        }
    }, [searchValue]);

    useEffect(() => {
        console.log('useEffect running', hoKhauInfo?.data?.data[0]?.id);
        // if (!isEmptyValue(hoKhauInfo?.data?.data[0]?.nhanKhau))
        // dispatch(LAY_NK_RESET_2());
        if (!isEmptyValue(hoKhauInfo?.data?.data[0]?.nhanKhau))
            // dispatch(LAY_NK_2({ ids: hoKhauInfo?.data?.data[0]?.nhanKhau }));
            dispatch(LAY_NK_2({ ids: [...hoKhauInfo?.data?.data[0]?.nhanKhau, hoKhauInfo?.data?.data[0]?.chu_ho_id] }));
        else {
            dispatch(LAY_NK_RESET_2());
        }
    }, [hoKhauInfo?.data?.data[0]]);

    return (
        <div>
            <div className="page-header">Tách hộ khẩu</div>
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={[12, 12]}>
                    <Col xs={6}>
                        <AppInputSearch
                            onChange={onChange}
                            type="number"
                            label="Số hộ khẩu cũ"
                            name="donTachKhau.so_ho_khau_cu"
                            required
                        ></AppInputSearch>
                    </Col>
                    <Col xs={6}>
                        <AppSelectApi apiURL="nhanKhau" label="Họ và tên - CCCD" name="donTachKhau.dai_dien_id" />
                    </Col>
                    <Col xs={6}>
                        <AppDateInput label="Ngày tách" name="donTachKhau.ngay_tach" required></AppDateInput>
                    </Col>
                    <Col xs={6}>
                        <AppDateInput label="Ngày làm đơn" name="donTachKhau.ngay_lam_don" required></AppDateInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput
                            type="text"
                            label="Điạ chỉ mới"
                            name="donTachKhau.dia_chi_moi"
                            required={false}
                        ></AppInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput label="Lý do" name="donTachKhau.ly_do"></AppInput>
                    </Col>
                </Row>
                <div className="second-header">Thông tin nhân khẩu</div>

                <Col xs={24}>
                    {/* {danhSachNhanKhau?.data?.data.map((nk, index) => ( */}
                    {nhanKhau?.map((nk, index) => (
                        <div key={index} className={cx('nk-wrapper')}>
                            {/* <div>{nk.id} </div> */}
                            <div style={{ display: 'none' }}>{nk.id} </div>

                            <div key={index} className={cx('nk-wrapper')}>
                                <Row gutter={24}>
                                    <Col xs={3}>
                                        <AppInput
                                            type="number"
                                            label="Nhân khẩu ID"
                                            value={nk.id}
                                            name={`donTachKhauCung[${index}].nhan_khau_id`}
                                            required
                                        ></AppInput>
                                    </Col>
                                    <Col xs={6}>
                                        <AppInput
                                            type="text"
                                            label="Họ và tên"
                                            value={nk.ho + nk.ten_dem + nk.ten}
                                        ></AppInput>
                                    </Col>
                                    <Col xs={4}>
                                        <AppInput
                                            type="text"
                                            label="Quan hệ chủ hộ"
                                            name={`donTachKhauCung[${index}].quan_he`}
                                            required={false}
                                        ></AppInput>
                                    </Col>
                                    <Col xs={6}>
                                        <AppInput
                                            type="text"
                                            label="Ghi chú tách khẩu cùng"
                                            name={`donTachKhauCung[${index}].ghi_chu`}
                                            required={false}
                                        ></AppInput>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="bottom-right">
                                            <AppCheckbox
                                                name={`donTachKhauCung[${index}].isChosen`}
                                                label="Chọn tách cùng"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ))}
                </Col>

                <AppButton type="submit">Xác nhận</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdSeparate;
