import { Table } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { LAY_LOAI_TB, LAY_TN_KHA_DUNG } from '../../redux/action';
import styles from './EquipmentAbleList.module.sass';

const cx = classNames.bind(styles);

const dataSource = [
    {
        name: 'nhan van hoa',
        thu_phi: 200,
        la_cong_trinh: 1,
        xuat_xu: 'string',
        mo_ta: 'string',
        ghi_chu: 'string',
        thu_phi_coc: 100,
        gia_tri: 10000,
    },
];

const columns = [
    {
        title: 'STT',
        render: (_, record, index) => index + 1,
        key: 'stt',
        width: 50,
    },
    {
        title: 'Tên loại tài nguyên',
        dataIndex: 'ten_tai_nguyen',
        key: 'ten_tai_nguyen',
        width: 200,
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
        key: 'mo_ta',
    },
    {
        title: 'Tình trạng ',
        dataIndex: 'tinh_trang',
        key: 'tinh_trang',
        width: 100,
    },
    // {
    //     title: 'Giá trị',
    //     dataIndex: 'gia_tri',
    //     key: 'gia_tri',
    //     width: 100,
    // },
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
            <div className={cx('action-wrapper')}>
                <div>{record.id}</div>
                <Link to={`/equipment/borrow/${record.id}`}>Mượn</Link>
            </div>
        ),
    },
];

function EquipmentAbleList(props) {
    const dispatch = useDispatch();
    const danhSachTNKhaDung = useSelector((state) => {
        console.log(state);
        return state.equipment.danhSachTNKhaDung;
    });

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            LAY_TN_KHA_DUNG({ type: id, startDate: '2000-01-01', endDate: moment(Date.now()).format('YYYY-MM-DD') }),
        );
    }, []);

    useEffect(() => {
        document.title = 'Danh sách tài nguyên khả dụng';
    }, []);

    return (
        <div>
            <div className="page-header flex-center">Danh sách tài nguyên khả dụng</div>
            {danhSachTNKhaDung.state === 'SUCCESS' && <Table dataSource={danhSachTNKhaDung?.data} columns={columns} />}
        </div>
    );
}

export default EquipmentAbleList;
