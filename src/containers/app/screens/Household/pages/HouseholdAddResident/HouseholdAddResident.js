import classNames from 'classnames/bind';
import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppForm from '~/components/AppForm';
import styles from './HouseholdAddResident.module.sass';
import AppInput from '~/components/AppInput';
import AppButton from '~/components/AppButton/AppButton';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import { Row, Col, notification, Button } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHUYEN_HK, NHAP_HK } from '../../redux/action';
import { REQUEST_STATE } from '~/app-configs';
import { useParams } from 'react-router-dom';
import { LAY_NK, LAY_NK_2, LAY_NK_RESET, LAY_NK_RESET_2 } from '../../../Resident/redux/action';
import AppSelectApi from '~/components/AppSelectApi';
import { IconPlus, IconX } from '~/assets/svgs';

const cx = classNames.bind(styles);

function HouseholdAddResident(props) {
    const [indexes, setIndexes] = React.useState([0]);
    const [counter, setCounter] = React.useState(1);
    const [reset, setReset] = useState(false);
    const nhapKhau = useSelector((state) => state.household.nhapHK);
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list2;
    });

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log('data: ', data);
        if (!id) dispatch(NHAP_HK(data));
        else {
            let submitData = {
                donNhapKhau: data.donNhapKhau,
                donNhapKhauCung: [{ ...data.donNhapKhauCung[0], nhan_khau_id: id }],
            };
            dispatch(NHAP_HK(submitData));
        }
    };

    const { id } = useParams();

    console.log('id', id);

    useEffect(() => {
        if (id) {
            dispatch(LAY_NK_RESET_2());
            setReset(true);

            dispatch(LAY_NK_2({ ids: id }));
        }
    }, []);
    console.log('reset', reset);
    console.log('state', danhSachNhanKhau.state);

    const addResident = () => {
        setIndexes((prevIndexes) => [...prevIndexes, counter]);
        setCounter((prevCounter) => prevCounter + 1);
    };

    const removeResident = (index) => () => {
        setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
        setCounter((prevCounter) => prevCounter - 1);
    };

    const clearResidents = () => {
        setIndexes([]);
    };

    useEffect(() => {
        if (nhapKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'G???i y??u c???u th??nh c??ng!',
            });
        }
        if (nhapKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'G???i y??u c???u th???t b???i!',
            });
        }
    }, [nhapKhau?.state]);

    useEffect(() => {
        document.title = 'Th??m nh??n kh???u v??o h??? kh???u ';
    }, []);

    console.log('danhSachNhanKhau', danhSachNhanKhau);
    return (
        <div>
            <div className="page-header">Nh???p kh???u</div>
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={[48, 12]}>
                    <Col xs={12}>
                        <AppSelectApi
                            apiURL="nhanKhau"
                            label="H??? v?? t??n - CCCD ng?????i ?????i di???n"
                            name="donNhapKhau.dai_dien_id"
                        />

                        {/* <AppInput type="text" label="Ng?????i ?????i di???n" name="donNhapKhau.dai_dien_id" required></AppInput> */}
                        <Row gutter={[64, 12]}>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="?????a ch??? c?? quan"
                                    name="donNhapKhau.dia_chi_co_quan"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="number"
                                    label="S??? h??? kh???u m???i"
                                    name="donNhapKhau.so_ho_khau_moi_id"
                                    required
                                ></AppInput>
                            </Col>
                        </Row>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="?????a ch??? c??"
                                    name="donNhapKhau.dia_chi_cu"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="?????a ch??? m???i"
                                    name="donNhapKhau.dia_chi_moi"
                                    required
                                ></AppInput>
                            </Col>
                        </Row>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppDateInput
                                    label="Ng??y l??m ????n"
                                    name="donNhapKhau.ngay_lam_don"
                                    required
                                ></AppDateInput>
                            </Col>
                            <Col xs={12}>
                                <AppDateInput
                                    label="Ng??y chuy???n"
                                    name="donNhapKhau.ngay_chuyen"
                                    required
                                ></AppDateInput>
                            </Col>
                        </Row>
                        <AppTextArea label="L?? do" name="donNhapKhau.ly_do"></AppTextArea>
                        <AppInput
                            type="text"
                            label="Ghi ch?? ????n chuy???n kh???u"
                            name="donNhapKhau.ghi_chu"
                            required={false}
                        ></AppInput>
                    </Col>
                    <Col xs={12}>
                        {indexes.map((index) => {
                            const fieldName = `Residents[${index}]`;
                            return (
                                <div key={index}>
                                    <Row gutter={[24, 12]}>
                                        {id && danhSachNhanKhau.state === 'SUCCESS' && reset && (
                                            <Col xs={11}>
                                                <AppInput
                                                    type="text"
                                                    label="Nh??n kh???u"
                                                    defaultValue={
                                                        danhSachNhanKhau?.data?.data[0]?.ho +
                                                        ' ' +
                                                        danhSachNhanKhau?.data?.data[0]?.ten_dem +
                                                        ' ' +
                                                        danhSachNhanKhau?.data?.data[0]?.ten
                                                    }
                                                    name={`donNhapKhauCung[${index}].nhan_khau_id`}
                                                    required
                                                ></AppInput>
                                            </Col>
                                        )}
                                        {!id && (
                                            <Col xs={11}>
                                                <AppInput
                                                    type="number"
                                                    label="Nh??n kh???u"
                                                    name={`donNhapKhauCung[${index}].nhan_khau_id`}
                                                    required
                                                ></AppInput>
                                            </Col>
                                        )}
                                        <Col xs={11}>
                                            <AppInput
                                                type="text"
                                                label="Quan h??? ch??? h???"
                                                name={`donNhapKhauCung[${index}].quan_he_chu_ho`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={11}>
                                            <AppInput
                                                type="text"
                                                label="Quan h??? v???i ?????i di???n"
                                                name={`donNhapKhauCung[${index}].quan_he_dai_dien`}
                                                required
                                            ></AppInput>
                                        </Col>
                                        <Col xs={11}>
                                            <AppInput
                                                type="text"
                                                label="Ghi ch?? chuy???n kh???u c??ng"
                                                name={`donNhapKhauCung[${index}].ghi_chu`}
                                                required={false}
                                            ></AppInput>
                                        </Col>
                                        {!id && (
                                            <Col xs={2}>
                                                {/* <AppButton color="orange" type="button" onClick={removeResident(index)}>
                                                    Remove
                                                </AppButton> */}
                                                <div onClick={removeResident(index)} className="action-wrapper">
                                                    <div className="action-icon">
                                                        <IconX width={18} height={18} />
                                                    </div>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                            );
                        })}
                        {!id && (
                            <div className="flex-right">
                                {/* <AppButton type="button" onClick={addResident}> */}
                                <div style={{ marginTop: '18px' }} onClick={addResident} className="action-wrapper">
                                    <div className="action-icon">
                                        <IconPlus />
                                    </div>
                                </div>
                                {/* </AppButton> */}
                                <Button danger onClick={clearResidents}>
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <div className="bottom-right">
                    <AppButton type="submit">Th??m</AppButton>
                </div>
            </AppForm>
        </div>
    );
}

export default HouseholdAddResident;
