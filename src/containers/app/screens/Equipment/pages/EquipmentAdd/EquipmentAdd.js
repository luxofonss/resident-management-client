import React from 'react';
import styles from './EquipmentAdd.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, Row } from 'antd';
import { useState } from 'react';
import AppCheckbox from '~/components/AppCheckbox';

const cx = classNames.bind(styles);

const options = [
    { name: 'Phương án A', value: 'A' },
    { name: 'Phương án B', value: 'B' },
    { name: 'Phương án C', value: 'C' },
    { name: 'Phương án E', value: 'E' },
    { name: 'Phương án F', value: 'F' },
];

function EquipmentAdd(props) {
    const [addType, setAddType] = useState(false);

    return (
        <div>
            <AppForm onSubmit={(data) => console.log(data)}>
                <Row gutter={48}>
                    {
                        // addType === true ? (
                        // //     <Col xs={12}>
                        // //         <AppInput required label="Loại thiết bị" name="themTB.loai_id"></AppInput>
                        // //         <AppInput required label="Mô tả" name="themTB.mo_ta"></AppInput>
                        // //         <AppInput required label="Tình trạng" name="themTB.tinh_trang"></AppInput>
                        // //         {/* <AppSelectInput required options={{ options }} label="Select" name="themTB.select"></AppSelectInput> */}
                        // //         <AppTextArea required label="Ghi chú" name="themTB.ghi_chu"></AppTextArea>
                        // //         <button onClick={() => setAddType(false)}>delete type</button>
                        // //     </Col>
                        // // ) : (
                        // //     <button onClick={() => setAddType(true)}>add type</button>
                        // )
                    }
                    <Col xs={12}>
                        <Row gutter={16}>
                            <Col xs={12}>
                                <AppInput required label="Tên thiết bị" name="themLoaiTB.name"></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput required label="Xuất xứ" name="themLoaiTB.xuat_xu"></AppInput>
                            </Col>
                        </Row>
                        <AppInput required label="Mô tả" name="themLoaiTB.mo_ta"></AppInput>
                        <Row gutter={16}>
                            <Col xs={12}>
                                <AppInput required label="Thu phí" name="themLoaiTB.thu_phi"></AppInput>
                            </Col>
                            <Col xs={12}>
                                <AppInput required label="Giá trị" name="themLoaiTB.gia_tru"></AppInput>
                            </Col>
                        </Row>
                        <AppInput required label="Số tiền cọc" name="themLoaiTB.thu_phi_coc"></AppInput>
                        <AppInput required label="Ghi chú" name="themLoaiTB.ghi_chu"></AppInput>
                        <AppCheckbox name="themLoaiTB.la_cong_trinh" label="Là công trình" />
                    </Col>
                </Row>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default EquipmentAdd;
