import { Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './HouseholdDetail.module.sass';
import { LAY_HK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const dataSource = [
    {
        key: '1',
        householdNumber: 125124,
        head: 'Nguyễn Văn A',
        address: '10 Downing Street',
    },
    {
        key: '2',
        householdNumber: 124234,
        head: 'Nguyễn Văn B',
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Số hộ khẩu',
        dataIndex: 'householdNumber',
        key: 'householdNumber',
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
        title: 'Action',
        key: 'id',
        fixed: 'right',
        width: 150,
        render: (_, { id }) => (
            <div className={cx('action-wrapper')}>
                <Link to={`/household/detail/${id}`}>detail</Link>
            </div>
        ),
    },
];

function HouseholdDetail(props) {
    const dispatch = useDispatch();
    const danhSachHoKhau = useSelector((state) => {
        console.log(state);
        return state.household?.danhSach;
    });
    const { id } = useParams();
    console.log('id', id);
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
                    id: hk.chu_ho_id,
                },
            ];
        });
    }

    useEffect(() => {
        dispatch(LAY_HK());
    }, []);

    return <div>{data !== [] && <Table dataSource={data} columns={columns} />}</div>;
}

export default HouseholdDetail;
