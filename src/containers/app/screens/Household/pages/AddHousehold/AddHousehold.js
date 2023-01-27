import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './AddHousehold.module.sass';
import AppInput from '~/components/AppInput';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import AppButton from '~/components/AppButton/AppButton';
import { THEM_HK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function AddHousehold(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

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
        console.log('data', data);
        dispatch(THEM_HK(data));
    };
    return (
        <div>
            <div className="page-header">Thêm hộ khẩu mới</div>
            <span>(*): Các trường bắt buộc nhập</span>
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <AppInput type="number" label="Chủ hộ" name="chu_ho_id" required></AppInput>
                <AppInput type="text" label="Địa chỉ" name="dia_chi" required></AppInput>
                <AppButton type="submit">Thêm</AppButton>
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
