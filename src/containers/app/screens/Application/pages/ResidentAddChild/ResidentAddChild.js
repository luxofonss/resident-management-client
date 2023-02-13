import { Button, notification, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_KHAI_SINH_NK, LAY_NK, LAY_NK_2 } from '../../../Resident/redux/action';
import {
    ACCEPT_CHUYEN_KHAU,
    ACCEPT_CHUYEN_KHAU_RESET,
    ACCEPT_TACH_KHAU,
    ACCEPT_TACH_KHAU_RESET,
    LAY_DON,
} from '../../redux/action';
import styles from './ResidentAddChild.module.sass';

const cx = classNames.bind(styles);

function ResidentAddChild(props) {
    const dispatch = useDispatch();
    const dons = useSelector((state) => state.resident.listKhaiSinhNK);
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });
    const danhSachNhanKhau2 = useSelector((state) => {
        return state.resident?.list2;
    });
    const acpTachKhau = useSelector((state) => state.application.acpTachKhau);

    useEffect(() => {
        dispatch(LAY_KHAI_SINH_NK({ type: 'don_tach_khau' }));
    }, []);

    const handleAccept = (id) => {
        // dispatch(ACCEPT_TACH_KHAU({ id: id }));
    };

    // useEffect(() => {
    //     let ignore = false;
    //     if (acpTachKhau.state == REQUEST_STATE.SUCCESS) {
    //         notification.success({
    //             message: 'Success',
    //             description: 'Phê duyệt thành công!',
    //         });
    //     }
    //     if (acpTachKhau?.state === REQUEST_STATE.ERROR) {
    //         notification.error({
    //             message: 'Error',
    //             description: 'Phê duyệt thất bại!',
    //         });
    //     }
    //     dispatch(ACCEPT_TACH_KHAU_RESET());
    //     dispatch(LAY_KHAI_SINH_NK({ type: 'don_tach_khau' }));
    // }, [acpTachKhau?.state]);

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
            key: 'ten',
            width: 150,
        },

        {
            title: 'Họ và tên bố',
            dataIndex: 'ten_bo',
            key: 'ten_bo',
            width: 150,
        },
        // {
        //     title: 'Người khai sinh',
        //     dataIndex: 'ten_nguoi_khai_sinh',
        //     key: 'ten_nguoi_khai_sinh',
        //     width: 140,
        // },
        { title: 'Họ và tên mẹ', dataIndex: 'ten_me', key: 'ten_me', width: 150 },
        {
            title: 'Sổ hộ khẩu',
            dataIndex: 'ho_khau_id',
            key: 'ho_khau_id',
            width: 120,
        },
        {
            title: 'Nơi đăng ký',
            dataIndex: 'noi_dang_ki',
            key: 'noi_dang_ki',
            width: 150,
        },
        {
            title: 'Ngày khai sinh',
            // dataIndex: 'ngay_khai_sinh',
            render: (_, record) => record.ngay_khai_sinh.slice(0, 1),
            key: 'ngay_khai_sinh',
            width: 140,
        },
        // {
        //     title: 'Ngày phê duyệt',
        //     dataIndex: 'ngay_phe_duyet',
        //     render: (_, record) => record.ngay_phe_duyet.slice(0, 1),
        //     key: 'ngay_phe_duyet',
        //     width: 140,
        // },

        {
            title: 'Ghi chú',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
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

    useEffect(() => {
        document.title = 'Giấy khai sinh';
    }, []);
    return (
        <div>
            <div className="page-header">Giấy khai sinh</div>

            <Table dataSource={dons?.data} columns={columns} />
        </div>
    );
}

export default ResidentAddChild;

// {

//     "user_phe_duyet": null,
//     "trang_thai": "s",
//
//     "role": "admin"
// },
