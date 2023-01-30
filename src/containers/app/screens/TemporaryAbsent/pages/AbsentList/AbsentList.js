import { Table, Tag, Space } from 'antd';
import classNames from 'classnames/bind';
import styles from './AbsentList.module.sass';
import { LAY_TAM_VANG } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IconEdit, IconTrash } from '~/assets/svgs';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'STT',
        width: 60,
        dataIndex: 'stt',
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
        render: (_, { id }) => (
            <div className={cx('action-wrapper')}>
                <div className={cx('action-icon')}>
                    <Link to={`/resident/edit/:${id}`}>
                        <IconEdit width={14} height={14} />
                    </Link>
                </div>
                <div className={cx('action-icon')}>
                    <Link to={`/resident/delete/:${id}`}>
                        <IconTrash width={14} height={14} />
                    </Link>
                </div>
                <Link to={`/resident/death/:${id}`}>Khai tử</Link>
            </div>
        ),
    },
];

function AbsentList(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LAY_TAM_VANG({ type: 'don_tam_vang' }));
    }, []);
    return (
        <div>
            {/* <Table
                dataSource={data}
                columns={columns}
                scroll={{
                    x: 1300,
                }}
            /> */}
        </div>
    );
}

export default AbsentList;
