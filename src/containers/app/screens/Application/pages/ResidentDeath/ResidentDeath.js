import { Button, notification, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_KHAI_TU_NK, LAY_NK, LAY_NK_2 } from '../../../Resident/redux/action';
import {
    ACCEPT_CHUYEN_KHAU,
    ACCEPT_CHUYEN_KHAU_RESET,
    ACCEPT_TACH_KHAU,
    ACCEPT_TACH_KHAU_RESET,
    LAY_DON,
} from '../../redux/action';
import styles from './ResidentDeath.module.sass';

const cx = classNames.bind(styles);

function ResidentDeath(props) {
    const dispatch = useDispatch();
    const dons = useSelector((state) => state.resident.listKhaiTuNK);

    useEffect(() => {
        dispatch(LAY_KHAI_TU_NK());
    }, []);

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => index + 1,
            key: 'id',
            width: 50,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'ten',
            width: 150,
            key: 'ten',
        },

        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
            width: 130,
        },
        {
            title: 'Người khai tử',
            dataIndex: 'ten_nguoi_khai_tu',
            key: 'ten_nguoi_khai_tu',
            width: 140,
        },

        {
            title: 'Quan hệ với người khai tử',
            dataIndex: 'quan_he',
            key: 'quan_he',
            width: 200,
        },
        {
            title: 'Ngày làm giấy',
            dataIndex: 'ngay_lam_giay',
            key: 'ngay_lam_giay',
            width: 140,
        },
        {
            title: 'Ngày khai tử',
            dataIndex: 'ngay_khai_tu',
            key: 'ngay_khai_tu',
            width: 140,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
        },
    ];
    return (
        <div>
            <Table dataSource={dons?.data} columns={columns} />
        </div>
    );
}

export default ResidentDeath;
