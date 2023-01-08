import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './AddHousehold.module.sass';
import AppInput from '~/components/AppInput';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import AppButton from '~/components/AppButton/AppButton';

const cx = classNames.bind(styles);

function AddHousehold(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <div className="page-header">Thêm hộ khẩu mới</div>
            <span>(*): Các trường bắt buộc nhập</span>
            <AppForm onSubmit={onSubmit}>
                <AppInput type="number" label="Số hộ khẩu" name="soHoKhau" required></AppInput>
            </AppForm>
            <AppButton type="primary" onClick={showModal}>
                Open Modal
            </AppButton>
            <Modal
                title={<h4>Basic Modal</h4>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <AppButton key="back" type="primary" onClick={handleCancel}>
                            Return
                        </AppButton>

                        <AppButton key="submit" type="primary" loading={loading} onClick={handleOk}>
                            Submit
                        </AppButton>
                    </div>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default AddHousehold;
