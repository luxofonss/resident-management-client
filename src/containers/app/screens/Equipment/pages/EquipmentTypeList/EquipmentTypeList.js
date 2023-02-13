import { Button, Table } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LAY_LOAI_TB } from '../../redux/action';
import styles from './EquipmentTypeList.module.sass';

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
        dataIndex: 'gia_tri',
        key: 'gia_tri',
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
    {
        title: 'Action',
        key: 'id',
        fixed: 'right',
        width: 150,
        render: (_, { id }) => (
            <div className={cx('action-wrapper')}>
                <Link to={`/equipment/history/${id}`}>
                    <Button>Lịch sử</Button>
                </Link>
            </div>
        ),
    },
];

function EquipmentTypeList(props) {
    const dispatch = useDispatch();
    const danhSachThietBi = useSelector((state) => {
        console.log(state);
        return state.equipment.danhSachLoaiThietBi;
    });
    const data = [];
    if (danhSachThietBi?.data) {
        console.log(danhSachThietBi?.data);
        danhSachThietBi?.data.forEach((tb) => {
            data.push({
                id: tb.id,
                name: tb.name,
                thu_phi: tb.thu_phi,
                la_cong_trinh: tb.la_cong_trinh,
                xuat_xu: tb.xuat_xu,
                mo_ta: tb.mo_ta,
                ghi_chu: tb.ghi_chu,
                thu_phi_coc: tb.thu_phi_coc,
                gia_tri: tb.gia_tri,
            });
        });
    }

    useEffect(() => {
        dispatch(LAY_LOAI_TB());
    }, []);

    useEffect(() => {
        document.title = 'Danh sách loại tài nguyên';
    }, []);

    return (
        <div>
            <div className="page-header flex-center">Danh sách loại tài nguyên</div>
            {danhSachThietBi.state === 'SUCCESS' && <Table dataSource={data} columns={columns} />}
        </div>
    );
}

export default EquipmentTypeList;
