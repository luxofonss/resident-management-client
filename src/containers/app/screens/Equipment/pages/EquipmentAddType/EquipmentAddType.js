import React from 'react';
import styles from './EquipmentAddType.module.sass';
import classNames from 'classnames/bind';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppFileInput from '~/components/AppFileInput';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppTextArea from '~/components/AppTextArea';
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

const options = [
    { name: 'Phương án A', value: 'A' },
    { name: 'Phương án B', value: 'B' },
    { name: 'Phương án C', value: 'C' },
    { name: 'Phương án E', value: 'E' },
    { name: 'Phương án F', value: 'F' },
];

function EquipmentAddType(props) {
    return (
        <div>
            <AppForm onSubmit={(data) => console.log(data)}>
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
                <div>
                    <label for="la_cong_trinh">Là công trình</label>
                    <input id="la_cong_trinh" type="checkbox" name="themLoaiTB.la_cong_trinh"></input>
                </div>
                <AppButton type="submit">Submit</AppButton>
            </AppForm>
        </div>
    );
}

export default EquipmentAddType;
