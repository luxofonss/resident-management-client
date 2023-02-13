import { Button, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './HouseholdList.module.sass';
import { LAY_HK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconEdit } from '~/assets/svgs';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Số hộ khẩu',
        dataIndex: 'householdNumber',
        key: 'householdNumber',
        width: 100,
    },
    {
        title: 'Họ và tên chủ hộ',
        dataIndex: 'head',
        key: 'head',
    },
    {
        title: 'Địa chỉ thường trú',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Số nhân khẩu',
        key: 'number',
        fixed: 'right',
        width: 150,
        render: (_, record) => <div>{record.nhanKhau.length + 1}</div>,
    },
    {
        title: 'Hành động',
        key: 'id',
        fixed: 'right',
        width: 150,
        height: 'auto',
        render: (_, { id }) => (
            <div className={cx('action-wrapper')}>
                <Link to={`/household/detail/${id}`}>
                    <Button>Xem chi tiết</Button>
                </Link>
            </div>
        ),
    },
];

function HouseholdList(props) {
    const dispatch = useDispatch();
    const danhSachHoKhau = useSelector((state) => {
        console.log(state);
        return state.household?.danhSach;
    });
    let data = [];
    if (danhSachHoKhau?.data?.data) {
        console.log(danhSachHoKhau?.data?.data);
        danhSachHoKhau?.data?.data.forEach((hk) => {
            data = [
                ...data,
                {
                    key: hk.id,
                    householdNumber: hk.id,
                    head: hk.ten_chu_ho,
                    address: hk.dia_chi,
                    id: hk.id,
                    nhanKhau: hk.nhanKhau,
                },
            ];
        });
    }

    useEffect(() => {
        dispatch(LAY_HK());
    }, []);

    return <div>{data !== [] && <Table dataSource={data} columns={columns} />}</div>;
}

export default HouseholdList;
