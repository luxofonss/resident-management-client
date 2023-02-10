import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './HouseholdSeparate.module.sass';
import AppInput from '~/components/AppInput';
import { Col, Row } from 'antd';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import AppButton from '~/components/AppButton/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { LAY_HK, LAY_HK_RESET, TACH_HK } from '../../redux/action';
import AppInputSearch from '~/components/AppInputSearch';
import { LAY_NK } from '../../../Resident/redux/action';
import AppCheckbox from '~/components/AppCheckbox';
import useDebounceValue from '~/hooks/useDebounceValue';
import AppSelectApi from '~/components/AppSelectApi';

const cx = classNames.bind(styles);

function HouseholdSeparate(props) {
    const [indexes, setIndexes] = useState([]);
    const [counter, setCounter] = useState(0);
    const [soHoKhau, setSoHoKhau] = useState('');
    const searchValue = useDebounceValue(soHoKhau, 1000);
    const hoKhauInfo = useSelector((state) => {
        console.log(state);
        return state.household?.danhSach;
    });
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        let submitData;
        let submitDonTachKhauCung = [];

        data.donTachKhauCung.map((don) => {
            if (don.isChosen === true) {
                submitDonTachKhauCung.push({
                    nhan_khau_id: don.nhan_khau_id,
                    quan_he_chu_ho: don.quan_he_chu_ho,
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
    }, []);

    useEffect(() => {
        if (searchValue !== '') dispatch(LAY_HK({ id: searchValue }));
    }, [searchValue]);

    useEffect(() => {
        dispatch(LAY_NK({ ids: hoKhauInfo?.data?.data[0].nhanKhau }));
    }, [hoKhauInfo?.data?.data[0]]);
    return (
        <div>
            tach ho khau
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={12}>
                    <Col xs={6}>
                        <AppSelectApi apiURL="nhanKhau" label="Họ và tên - CCCD" name="donTachKhau.dai_dien_id" />
                    </Col>

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

                <Col xs={24}>
                    {hoKhauInfo?.data?.data[0] &&
                        danhSachNhanKhau?.data?.data.map((nk, index) => (
                            <div className={cx('nk-wrapper')}>
                                <Row gutter={24}>
                                    <Col xs={3}>
                                        <AppInput
                                            type="number"
                                            label="Nhân khẩu ID"
                                            defaultValue={nk.id}
                                            name={`donTachKhauCung[${index}].nhan_khau_id`}
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
                        ))}
                </Col>

                <AppButton type="submit">Thêm</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdSeparate;
