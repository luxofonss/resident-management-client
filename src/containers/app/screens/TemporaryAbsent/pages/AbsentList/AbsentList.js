import { Table, Tag, Space, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from './AbsentList.module.sass';
import { ACCEPT_TAM_VANG, LAY_TAM_VANG } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IconEdit, IconTrash } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function AbsentList(props) {
    const dispatch = useDispatch();
    const tamVangList = useSelector((state) => {
        return state.temporaryAbsent.tamVangList;
    });
    const tamVangAcp = useSelector((state) => {
        return state.temporaryAbsent.acpTamVang;
    });

    const handleAccept = (id) => {
        dispatch(ACCEPT_TAM_VANG({ id: id }));
    };

    useEffect(() => {
        let ignore = false;

        if (tamVangAcp.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
        }
        if (tamVangAcp?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        return () => {
            ignore = true;
        };
    }, [tamVangAcp?.state]);

    console.log('tamVangList', tamVangList);
    useEffect(() => {
        dispatch(LAY_TAM_VANG({ type: 'don_tam_vang' }));
    }, [tamVangAcp?.state]);

    const columns = [
        {
            title: 'STT',
            width: 60,
            render: (_, record, index) => index + 1,
            key: 'stt',
            fixed: 'left',
        },
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Ngày làm đơn',
            width: 120,
            dataIndex: 'ngay_lam_don',
            key: 'ngay_lam_don',
            sorter: true,
        },
        {
            title: 'Lý do',
            dataIndex: 'ly_do',
            key: 'ly_do',
        },
        {
            title: 'Địa chỉ tạm trú',
            dataIndex: 'dia_chi_tam_chu',
            key: 'dia_chi_tam_chu',
        },
        {
            title: 'Số hộ khẩu',
            dataIndex: 'so_ho_khau_id',
            key: 'so_ho_khau_id',
        },
        {
            title: 'Nguời phê duyệt',
            dataIndex: 'user_phe_duyet',
            key: 'user_phe_duyet',
        },
        {
            title: 'Ngày phê duyệt',
            width: 120,
            dataIndex: 'ngay_phe_duyet',
            key: 'ngay_phe_duyet',
            sorter: true,
        },
        {
            title: 'Ngày hết hạn',
            width: 120,
            dataIndex: 'ngay_het_han',
            key: 'ngay_het_han',
            sorter: true,
        },
        {
            title: 'Trạng thái',
            key: 'trang_thai',
            dataIndex: 'trang_thai',
            width: 120,
            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : 'volcano'}>
                        {trang_thai === 'PHE_DUYET' ? 'Đã phê duyệt' : 'Chờ phê duyệt'}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
        },
        {
            title: 'Action',
            key: 'id',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div
                    style={record.trang_thai === 'TAO_MOI' ? {} : { display: 'none' }}
                    className={cx('action-wrapper')}
                >
                    <button onClick={() => handleAccept(record.id)}>phe duyet</button>
                </div>
            ),
        },
    ];
    return (
        <div>
            {tamVangList.state === REQUEST_STATE.SUCCESS && (
                <Table
                    dataSource={tamVangList.data}
                    columns={columns}
                    scroll={{
                        x: 1300,
                    }}
                />
            )}
        </div>
    );
}

export default AbsentList;
