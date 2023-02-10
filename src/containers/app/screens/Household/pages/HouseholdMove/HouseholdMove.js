import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppForm from '~/components/AppForm';
import styles from './HouseholdMove.module.sass';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import { Row, Col } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHUYEN_HK, LAY_HK, LAY_HK_RESET } from '../../redux/action';
import AppInputSearch from '~/components/AppInputSearch';
import useDebounceValue from '~/hooks/useDebounceValue';
import { LAY_NK, LAY_NK_FAIL } from '../../../Resident/redux/action';
import AppSelectApi from '~/components/AppSelectApi';
import AppCheckbox from '~/components/AppCheckbox';

const cx = classNames.bind(styles);

function HouseholdMove(props) {
    const [soHoKhau, setSoHoKhau] = useState('');
    const searchValue = useDebounceValue(soHoKhau, 1000);
    const hoKhauInfo = useSelector((state) => {
        return state.household.danhSach;
    });
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log('data: ', data);
        let submitData;
        let submitDonChuyenKhauCung = [];

        data.donChuyenKhauCung.map((don) => {
            if (don.isChosen === true) {
                submitDonChuyenKhauCung.push({
                    nhan_khau_id: don.nhan_khau_id,
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
        console.log(e.target.value);
        setSoHoKhau(e.target.value);
    };

    useEffect(() => {
        dispatch(LAY_HK_RESET());
    }, []);

    useEffect(() => {
        if (searchValue !== '') dispatch(LAY_HK({ id: searchValue }));
    }, [searchValue]);

    useEffect(() => {
        dispatch(LAY_NK({ ids: hoKhauInfo?.data?.data[0]?.nhanKhau }));
    }, [hoKhauInfo?.data?.data[0]?.nhanKhau]);

    return (
        <div>
            chuyen ho khau
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={[12, 8]}>
                    <Col xs={6}>
                        <AppSelectApi apiURL="nhanKhau" label="Họ và tên - CCCD" name="donChuyenKhau.dai_dien_id" />
                    </Col>

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

                    <Col xs={24}>
                        {hoKhauInfo?.data?.data[0] &&
                            danhSachNhanKhau?.data?.data.map((nk, index) => (
                                <div className={cx('nk-wrapper')}>
                                    <Row gutter={24}>
                                        <Col xs={4}>
                                            <AppInput
                                                type="number"
                                                label="Nhân khẩu ID"
                                                defaultValue={nk.id}
                                                name={`donChuyenKhauCung[${index}].nhan_khau_id`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={6}>
                                            <AppInput
                                                type="text"
                                                label="Họ và tên"
                                                defaultValue={nk.ho + nk.ten_dem + nk.ten}
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
                            ))}
                    </Col>
                </Row>
                <AppButton type="submit">Thêm</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdMove;
