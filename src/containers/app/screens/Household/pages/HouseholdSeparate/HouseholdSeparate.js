import React from 'react';
import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './HouseholdSeparate.module.sass';
import AppInput from '~/components/AppInput';
import { Col, Row } from 'antd';
import AppDateInput from '~/components/AppDateInput';
import AppTextArea from '~/components/AppTextArea';
import AppButton from '~/components/AppButton/AppButton';
import { useDispatch } from 'react-redux';
import { TACH_HK } from '../../redux/action';

const cx = classNames.bind(styles);

function HouseholdSeparate(props) {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        console.log('data: ', data);
        dispatch(TACH_HK(data));
    };

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

    return (
        <div>
            tach ho khau
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={48}>
                    <Col xs={12}>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppInput
                                    type="text"
                                    label="Người đại diện"
                                    name="donTachKhau.dai_dien_id"
                                    required
                                ></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput
                                    type="number"
                                    label="Số hộ khẩu cũ"
                                    name="donTachKhau.so_ho_khau_cu"
                                    required
                                ></AppInput>
                            </Col>
                        </Row>
                        <Row gutter={64}>
                            <Col xs={12}>
                                <AppDateInput label="Ngày tách" name="donTachKhau.ngay_tach" required></AppDateInput>
                            </Col>
                            <Col xs={12}>
                                <AppDateInput
                                    label="Ngày làm đơn"
                                    name="donTachKhau.ngay_lam_don"
                                    required
                                ></AppDateInput>
                            </Col>
                        </Row>
                        <AppTextArea label="Lý do" name="donTachKhau.ly_do"></AppTextArea>
                        <AppInput
                            type="text"
                            label="Điạ chỉ mới"
                            name="donTachKhau.dia_chi_moi"
                            required={false}
                        ></AppInput>
                    </Col>
                    <Col xs={12}>
                        {indexes.map((index) => {
                            const fieldName = `Residents[${index}]`;
                            return (
                                <div>
                                    <Row gutter={64}>
                                        <Col xs={12}>
                                            <AppInput
                                                type="number"
                                                label="Nhân khẩu"
                                                name={`donTachKhauCung[${index}].nhan_khau_id`}
                                                required={false}
                                            ></AppInput>
                                        </Col>
                                        <Col xs={12}>
                                            <AppInput
                                                type="text"
                                                label="Quan hệ chủ hộ"
                                                name={`donTachKhauCung[${index}].quan_he_chu_ho`}
                                                required={false}
                                            ></AppInput>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <AppInput
                                            type="text"
                                            label="Ghi chú chuyển khẩu cùng"
                                            name={`donTachKhauCung[${index}].ghi_chu`}
                                            required={false}
                                        ></AppInput>
                                    </Row>
                                    <Row>
                                        <AppButton color="orange" type="button" onClick={removeResident(index)}>
                                            Remove
                                        </AppButton>
                                    </Row>
                                </div>
                            );
                        })}
                        <AppButton type="button" onClick={addResident}>
                            Add Resident
                        </AppButton>
                        <AppButton type="button" onClick={clearResidents}>
                            Clear Residents
                        </AppButton>
                    </Col>
                </Row>
                <AppButton type="submit">Thêm</AppButton>
            </AppForm>
        </div>
    );
}

export default HouseholdSeparate;
