import classNames from 'classnames/bind';
import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppForm from '~/components/AppForm';
import styles from './HouseholdMove.module.sass';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import { Row, Col, notification } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHUYEN_HK, CHUYEN_HK_RESET, LAY_HK, LAY_HK_RESET } from '../../redux/action';
import AppInputSearch from '~/components/AppInputSearch';
import useDebounceValue from '~/hooks/useDebounceValue';
import { LAY_NK_2, LAY_NK_2_FAIL, LAY_NK_RESET, LAY_NK_RESET_2 } from '../../../Resident/redux/action';
import AppSelectApi from '~/components/AppSelectApi';
import AppCheckbox from '~/components/AppCheckbox';
import { isEmptyValue } from '~/helpers/check';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function HouseholdMove(props) {
    const [soHoKhau, setSoHoKhau] = useState('');
    const [nhanKhau, setNhanKhau] = useState([]);
    const searchValue = useDebounceValue(soHoKhau, 1000);
    const hoKhauInfo = useSelector((state) => {
        return state.household.danhSach;
    });
    const chuyenKhau = useSelector((state) => state.household.chuyenHK);
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list2;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (chuyenKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Gửi yêu cầu thành công!',
            });
            dispatch(CHUYEN_HK_RESET());
        }
        if (chuyenKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Gửi yêu cầu thất bại!',
            });
        }
    }, [chuyenKhau?.state]);

    useEffect(() => {
        setNhanKhau(danhSachNhanKhau?.data?.data);
    }, [danhSachNhanKhau?.data?.data]);

    const onSubmit = (data) => {
        console.log('data: ', data);
        let submitData;
        let submitDonChuyenKhauCung = [];

        data.donChuyenKhauCung.map((don) => {
            if (don.isChosen === true) {
                submitDonChuyenKhauCung.push({
                    nhan_khau_id: parseInt(don.nhan_khau_id),
                    quan_he_chu_ho: don.quan_he_chu_ho,
                    ghi_chu: don.ghi_chu,
                });
            }
        });
        submitData = {
            donChuyenKhau: { ...data.donChuyenKhau, so_ho_khau_cu: searchValue },
            donChuyenKhauCung: submitDonChuyenKhauCung,
        };

        console.log(submitData);
        dispatch(CHUYEN_HK(submitData));
    };

    const onChange = (e) => {
        console.log('INPUT', e.target.value);
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
            dispatch(LAY_NK_2({ ids: hoKhauInfo?.data?.data[0]?.nhanKhau }));
        else {
            dispatch(LAY_NK_RESET_2());
        }
    }, [hoKhauInfo?.data?.data[0]?.id]);

    return (
        <div>
            <div className={cx('page-header')}>Chuyển hộ khẩu</div>
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={[12, 12]}>
                    <Col xs={6}>
                        <AppInputSearch
                            onChange={onChange}
                            type="number"
                            label="Số hộ khẩu cũ"
                            name="donChuyenKhau.so_ho_khau_cu"
                            required
                        ></AppInputSearch>
                    </Col>
                    <Col xs={6}>
                        <AppSelectApi
                            apiURL="nhanKhau"
                            label="CCCD - Họ và tên người đại diện"
                            name="donChuyenKhau.dai_dien_id"
                            required
                        />
                    </Col>

                    <Col xs={6}>
                        <AppInput
                            type="number"
                            label="Số hộ khẩu mới"
                            name="donChuyenKhau.so_ho_khau_moi"
                            required
                        ></AppInput>
                    </Col>

                    <Col xs={6}>
                        <AppDateInput label="Ngày chuyển" name="donChuyenKhau.ngay_chuyen" required></AppDateInput>
                    </Col>
                    <Col xs={6}>
                        <AppDateInput label="Ngày làm đơn" name="donChuyenKhau.ngay_lam_don" required></AppDateInput>
                    </Col>
                    <Col xs={12}>
                        <AppInput label="Lý do" name="donChuyenKhau.ly_do"></AppInput>
                    </Col>
                    <Col xs={6}>
                        <AppInput
                            type="text"
                            label="Ghi chú đơn chuyển khẩu"
                            name="donChuyenKhau.ghi_chu"
                            required={false}
                        ></AppInput>
                    </Col>

                    <div className="second-header">Thông tin nhân khẩu</div>

                    <Col xs={24}>
                        {nhanKhau?.map((nk, index) => {
                            // {danhSachNhanKhau?.data?.data?.map((nk, index) => {
                            return (
                                <div>
                                    <div style={{ display: 'none' }}>{nk.id} </div>
                                    <div key={index} className={cx('nk-wrapper')}>
                                        <Row gutter={[24, 12]}>
                                            <Col xs={4}>
                                                <AppInput
                                                    type="number"
                                                    label="Nhân khẩu ID"
                                                    value={nk.id}
                                                    name={`donChuyenKhauCung[${index}].nhan_khau_id`}
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
                                                    name={`donChuyenKhauCung[${index}].quan_he_chu_ho`}
                                                    required={false}
                                                ></AppInput>
                                            </Col>
                                            <Col xs={6}>
                                                <AppInput
                                                    type="text"
                                                    label="Ghi chú chuyển khẩu cùng"
                                                    name={`donChuyenKhauCung[${index}].ghi_chu`}
                                                    required={false}
                                                ></AppInput>
                                            </Col>
                                            <Col xs={4}>
                                                <div className="bottom-right">
                                                    <AppCheckbox
                                                        name={`donChuyenKhauCung[${index}].isChosen`}
                                                        label="Chọn chuyển cùng"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
                <div className="bottom-right">
                    <AppButton type="submit">Xác nhận</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default HouseholdMove;
