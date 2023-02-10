import { Table } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LAY_LOAI_TB } from '../../redux/action';
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
        title: 'Tên loại thiết bị',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
        key: 'mo_ta',
    },
    {
        title: 'Xuất xứ',
        dataIndex: 'xuat_xu',
        key: 'xuat_xu',
        width: 100,
    },
    {
        title: 'Giá trị',
        dataIndex: 'gia_trị',
        key: 'gia_trị',
        width: 100,
    },
    {
        title: 'Thu phí',
        dataIndex: 'thu_phi',
        key: 'thu_phi',
        width: 100,
    },
    {
        title: 'Thu phí cọc',
        dataIndex: 'thu_phi_coc',
        key: 'thu_phi_coc',
        width: 120,
    },
    {
        title: 'Là công trình',
        dataIndex: 'la_cong_trinh',
        key: 'la_cong_trinh',
    },
    {
        title: 'Ghi chú',
        dataIndex: 'ghi_chu',
        key: 'ghi_chu',
    },
];

function EquipmentBorrowList(props) {
    const dispatch = useDispatch();
    const danhSachThietBi = useSelector((state) => {
        console.log(state);
        return state.equipment?.list;
    });
    let data = [];
    if (danhSachThietBi?.data?.data) {
        console.log(danhSachThietBi?.data?.data);
        danhSachThietBi?.data?.data.forEach((tb) => {
            data = [
                ...data,
                {
                    name: tb.name,
                    thu_phi: tb.thu_phi,
                    la_cong_trinh: tb.la_cong_trinh,
                    xuat_xu: tb.xuat_xu,
                    mo_ta: tb.mo_ta,
                    ghi_chu: tb.ghi_chu,
                    thu_phi_coc: tb.thu_phi_coc,
                    gia_tri: tb.gia_tri,
                },
            ];
        });
    }

    useEffect(() => {
        dispatch(LAY_LOAI_TB());
    }, []);

    return <div>{data !== [] && <Table dataSource={dataSource} columns={columns} />}</div>;
    // return (
    //     <div>
    //         <Table dataSource={dataSource} columns={columns} />
    //     </div>
    // );
}

export default EquipmentBorrowList;
