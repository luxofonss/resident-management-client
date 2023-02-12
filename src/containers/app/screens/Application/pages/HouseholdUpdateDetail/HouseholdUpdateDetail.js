import { Button, notification, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_HK } from '../../../Household/redux/action';
import { LAY_NK_2 } from '../../../Resident/redux/action';
import { ACCEPT_DINH_CHINH_KHAU, ACCEPT_DINH_CHINH_KHAU_RESET, LAY_DON } from '../../redux/action';
import styles from './HouseholdUpdateDetail.module.sass';

const cx = classNames.bind(styles);

function HouseholdUpdateDetail(props) {
    const dispatch = useDispatch();
    const dons = useSelector((state) => state.application.list);
    const danhSachHoKhau = useSelector((state) => {
        return state.household?.danhSach;
    });

    useEffect(() => {
        dispatch(LAY_DON({ type: 'don_dinh_chinh_so_ho_khau' }));
    }, []);

    const handleAccept = (id) => {
        dispatch(ACCEPT_DINH_CHINH_KHAU({ id: id }));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Số hộ khẩu',
            dataIndex: 'so_ho_khau_id',
            key: 'so_ho_khau_id',
            width: 120,
        },
        {
            title: 'Ngày làm đơn',
            dataIndex: 'ngay_lam_don',
            key: 'ngay_lam_don',
            width: 140,
        },
        {
            title: 'Ngày phê duyệt',
            dataIndex: 'ngay_phe_duyet',
            key: 'ngay_phe_duyet',
            width: 160,
        },

        {
            title: 'Người phê duyệt',
            dataIndex: 'user_phe_duyet',
            key: 'user_phe_duyet',
            width: 170,
        },

        {
            title: 'Ghi chú',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
            width: 250,
        },
        {
            title: 'Trạng thái',
            key: 'trang_thai',
            dataIndex: 'trang_thai',
            width: 100,

            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : 'volcano'}>
                        {trang_thai === 'PHE_DUYET' ? 'Đã phê duyệt' : 'Chờ phê duyệt'}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 250,
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div
                        style={record.trang_thai === 'TAO_MOI' ? {} : { display: 'none' }}
                        className={cx('action-wrapper')}
                    >
                        <Button onClick={() => handleAccept(record.id)}>Phê duyệt</Button>
                    </div>
                    <Button>Xem chi tiết</Button>
                </div>
            ),
        },
    ];
    return (
        <div>{dons.state === REQUEST_STATE.SUCCESS && <Table dataSource={dataSourceInput} columns={columns} />}</div>
    );
}

export default HouseholdUpdateDetail;
