import { Button, Col, Modal, notification, Row, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import AppButton from '~/components/AppButton/AppButton';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppSelectInput from '~/components/AppSelectInput';
import { DUYET_USER, DUYET_USER_RESET, LAY_USER, TAO_USER, TAO_USER_RESET } from '../../redux/action';
import styles from './Admin.module.sass';

const cx = classNames.bind(styles);

function Admin(props) {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.admin.list);
    const acceptUser = useSelector((state) => state.admin.acceptUser);
    const createUser = useSelector((state) => state.admin.createUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAccept = (id) => {
        dispatch(DUYET_USER({ id: id }));
    };

    useEffect(() => {
        let ignore = false;
        if (acceptUser.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
            dispatch(LAY_USER());
        }
        if (acceptUser?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        dispatch(DUYET_USER_RESET());
    }, [acceptUser?.state]);

    useEffect(() => {
        let ignore = false;
        if (createUser.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
            dispatch(LAY_USER());
        }
        if (createUser?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        dispatch(TAO_USER_RESET());
    }, [createUser?.state]);

    useEffect(() => {
        dispatch(LAY_USER());
    }, []);
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => index + 1,
            key: 'stt',
            width: 50,
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        //     width: 50,
        // },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },

        {
            title: 'Ngày đăng ký',
            render: (_, record) => record.ngay_dang_ki?.slice(0, 10),
            key: 'ngay_dang_ki',
            width: 140,
        },
        {
            title: 'Ngày phê duyệt',
            render: (_, record) => record.ngay_phe_duyet?.slice(0, 10),
            key: 'ngay_phe_duyet',
            width: 140,
        },
        {
            title: 'Chức vụ',
            render: (_, record) => {
                if (record.role === 'admin') {
                    return <Tag color="geekblue">Admin</Tag>;
                } else {
                    return <Tag color="volcano">User</Tag>;
                }
            },
            key: 'chuc_v',
            width: 140,
        },
        // {
        //     title: 'Trạng thái',
        //     key: 'trang_thai',
        //     dataIndex: 'trang_thai',
        //     render: (_, { trang_thai }) => (
        //         <>
        //             <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : 'volcano'}>
        //                 {trang_thai === 'PHE_DUYET' ? 'Đã phê duyệt' : 'Chờ phê duyệt'}
        //             </Tag>
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     fixed: 'right',
        //     width: 150,
        //     render: (_, record) => (
        //         <div
        //             style={record.trang_thai !== 'PHE_DUYET' ? {} : { display: 'none' }}
        //             className={cx('action-wrapper')}
        //         >
        //             <Button onClick={() => handleAccept(record.id)}>Phê duyệt</Button>
        //         </div>
        //     ),
        // },
    ];
    const onSubmit = (data) => {
        console.log(data);
        dispatch(TAO_USER(data));
    };
    return (
        <div>
            <div>
                <div className="page-header">Danh sách admin</div>
                <div className="bottom-right" style={{ marginBottom: '24px!important' }}>
                    <Button type="primary" onClick={showModal}>
                        Thêm quản lý
                    </Button>
                </div>
                <Modal footer={[]} title="Thêm quản lý" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div style={{ width: '60%', minWidth: '300px', margin: '0 auto' }}>
                        <AppForm onSubmit={onSubmit}>
                            <Row gutter={[24, 12]}>
                                <Col xs={24}>
                                    <AppInput name="username" label="Tên đăng nhập" />
                                </Col>
                                <Col xs={24}>
                                    <AppSelectInput
                                        name="role"
                                        label="Chức vụ"
                                        options={{
                                            options: [
                                                { name: 'Admin', value: 'admin' },
                                                { name: 'User', value: 'user' },
                                            ],
                                        }}
                                    />
                                </Col>
                                <Col xs={24}>
                                    <AppInput type="password" name="password" label="Mật khẩu" />
                                </Col>
                                <Col xs={24}>
                                    <AppInput type="password" name="repassword" label="Mật lại khẩu" />
                                </Col>
                            </Row>
                            <div style={{ gap: '8px', marginTop: '24px' }} className="bottom-right">
                                <AppButton style={{ height: '38px', padding: '2px' }} onClick={handleCancel}>
                                    Hủy
                                </AppButton>
                                <AppButton style={{ height: '38px', padding: '2px' }} onClick={handleOk} type="submit">
                                    Xác nhận
                                </AppButton>
                            </div>
                        </AppForm>
                    </div>
                </Modal>
            </div>
            {userList.state === 'SUCCESS' && <Table dataSource={userList?.data} columns={columns} />}
        </div>
    );
}

export default Admin;
