import React, { Fragment } from 'react';
import styles from './Demo.module.sass';
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

function Demo(props) {
    return (
        <Fragment>
            <div className="page-header flex-center">Hệ thống quản lý sộ hộ khẩu</div>
            <div className="flex-center" style={{ width: '50%', minWidth: '400px', margin: '0 auto' }}>
                <AppForm>
                    <Row gutter={[24, 12]}>
                        <Col xs={24}>
                            <AppInput label="Giảng viên" value="ThS. Nguyễn Mạnh Tuấn" disabled />
                        </Col>
                        <Col xs={24}>
                            <AppInput label="Môn" value="Công nghệ phần mềm" disabled />
                        </Col>
                        <Col xs={24}>
                            <div className="second-header">Thành viên nhóm</div>
                        </Col>
                        <Col xs={24}>
                            <AppInput value="Nguyễn Khánh An" disabled />
                        </Col>
                        <Col xs={24}>
                            <AppInput value="Vũ Việt Bách" diasbled />
                        </Col>
                        <Col xs={24}>
                            <AppInput value="Nguyễn Văn Quyền" diasbled />
                        </Col>
                        <Col xs={24}>
                            <AppInput value="Nguyễn Minh Tuấn" disabled />
                        </Col>
                        <Col xs={24}>
                            <AppInput value="Nguyễn Văn Thọ" disabled />
                        </Col>
                    </Row>
                </AppForm>
            </div>
        </Fragment>
    );
}

export default Demo;
