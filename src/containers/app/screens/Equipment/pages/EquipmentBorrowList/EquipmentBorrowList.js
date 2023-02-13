import { Button, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LAY_LOAI_TB, LAY_PHIEU_MUON } from '../../redux/action';
import styles from './EquipmentBorrowList.module.sass';

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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 50,
    },
    {
        title: 'Họ và tên',
        dataIndex: 'ho_va_ten',
        key: 'ho_va_ten',
    },
    {
        title: 'CCCD',
        dataIndex: 'cccd',
        key: 'cccd',
        width: 100,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'so_dien_thoai',
        key: 'so_dien_thoai',
        width: 100,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 100,
    },
    // {
    //     title: 'Người tạo',
    //     dataIndex: 'user_tao',
    //     key: 'user_tao',
    //     width: 120,
    // },
    // {
    //     title: 'Người phê duyệt',
    //     dataIndex: 'user_phe_duyet',
    //     key: 'user_phe_duyet',
    // },

    {
        title: 'Lý do',
        dataIndex: 'ly_do',
        key: 'ly_do',
    },
    {
        title: 'Đăng ký',
        dataIndex: 'sao_ke_dang_ki',
        key: 'sao_ke_dang_ki',
    },
    {
        title: 'Trả',
        dataIndex: 'sao_ke_tra',
        key: 'sao_ke_tra',
    },
    // {
    //     title: 'Ngày phê duyệt',
    //     dataIndex: 'ngay_phe_duyet',
    //     key: 'ngay_phe_duyet',
    // },
    // {
    //     title: 'Trạng thái',
    //     key: 'trang_thai',
    //     dataIndex: 'trang_thai',
    //     render: (_, { trang_thai }) => (
    //         <>
    //             <Tag color={trang_thai === 'DONE' ? 'geekblue' : 'volcano'}>
    //                 {trang_thai === 'DONE' ? 'Đã phê duyệt' : 'Chờ phê duyệt'}
    //             </Tag>
    //         </>
    //     ),
    // },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
            <Button>
                <Link to={`/equipment/borrow/detail/${record.id}`}>Xem chi tiết</Link>
            </Button>
        ),
    },
];

function EquipmentBorrowList(props) {
    const dispatch = useDispatch();
    const danhSachPhieuMuon = useSelector((state) => {
        console.log(state);
        return state.equipment?.layPhieuMuon;
    });

    useEffect(() => {
        dispatch(LAY_PHIEU_MUON());
    }, []);

    return (
        <div>
            <div className="page-header flex-center">Danh sách phiếu mượn</div>

            {danhSachPhieuMuon.state === 'SUCCESS' && <Table dataSource={danhSachPhieuMuon.data} columns={columns} />}
        </div>
    );
}

export default EquipmentBorrowList;
