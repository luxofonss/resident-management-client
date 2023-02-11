import { Table, Tag, Space, notification, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './AbsentList.module.sass';
import { ACCEPT_TAM_VANG, LAY_TAM_VANG } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IconEdit, IconTrash } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function AbsentList(props) {
    const dispatch = useDispatch();
    const tamVangList = useSelector((state) => {
        return state.temporaryAbsent.tamVangList;
    });
    const tamVangAcp = useSelector((state) => {
        return state.temporaryAbsent.acpTamVang;
    });
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });

    const danhSachNhanKhau2 = useSelector((state) => {
        return state.resident?.list2;
    });

    const handleAccept = (id) => {
        dispatch(ACCEPT_TAM_VANG({ id: id }));
    };
    const idList = [];
    const idPDList = [];
    const dataSource = [];

    if (tamVangList.state === 'SUCCESS') {
        tamVangList.data.forEach((tamvang, index) => {
            idList.push(tamvang.nhan_khau_id);
            if (tamvang.user_phe_duyet) {
                idPDList.push(tamvang.user_phe_duyet);
            } else {
                idPDList.push(-1);
            }
        });
    }
    if (tamVangList.state === 'SUCCESS' && danhSachNhanKhau.state === 'SUCCESS') {
        console.log('test: ', tamVangList.data);

        tamVangList.data.forEach((tamvang, index) => {
            dataSource.push({
                stt: index + 1,
                key: tamvang.id,
                dia_chi_tam_tru: tamvang.dia_chi_tam_tru,
                ghi_chu: tamvang.ghi_chu,
                fullName: danhSachNhanKhau?.data?.data[index]
                    ? danhSachNhanKhau?.data?.data[index]?.ho +
                      ' ' +
                      danhSachNhanKhau?.data?.data[index]?.ten_dem +
                      ' ' +
                      danhSachNhanKhau?.data?.data[index]?.ten
                    : '',
                ly_do: tamvang.ly_do,
                ngay_het_han: tamvang.ngay_het_han?.slice(0, 10),
                ngay_lam_don: tamvang.ngay_lam_don?.slice(0, 10),
                ngay_phe_duyet: tamvang.ngay_phe_duyet?.slice(0, 10),
                trang_thai: tamvang.trang_thai,
                user_phe_duyet:
                    idPDList[index] !== -1 && danhSachNhanKhau2?.data?.data[index]?.ho
                        ? danhSachNhanKhau2?.data?.data[index]?.ho +
                          ' ' +
                          danhSachNhanKhau2?.data?.data[index]?.ten_dem +
                          ' ' +
                          danhSachNhanKhau2?.data?.data[index]?.ten
                        : '',
            });
        });
    }

    useEffect(() => {
        let ignore = false;

        if (tamVangAcp.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
        }
        if (tamVangAcp?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        return () => {
            ignore = true;
        };
    }, [tamVangAcp?.state]);

    console.log('tamVangList', tamVangList);
    useEffect(() => {
        dispatch(LAY_TAM_VANG({ type: 'don_tam_vang' }));
    }, [tamVangAcp?.state]);

    const columns = [
        {
            title: 'STT',
            width: 60,
            render: (_, record, index) => index + 1,
            key: 'stt',
            fixed: 'left',
        },
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'fullName',
            key: 'fullName',
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
            width: 120,
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
            render: (_, record) => (
                <div
                    style={record.trang_thai === 'TAO_MOI' ? {} : { display: 'none' }}
                    className={cx('action-wrapper')}
                >
                    <Button onClick={() => handleAccept(record.id)}>Phê duyệt</Button>
                </div>
            ),
        },
    ];
    return (
        <div>
            {tamVangList.state === REQUEST_STATE.SUCCESS && (
                <Table
                    dataSource={tamVangList.data}
                    columns={columns}
                    scroll={{
                        x: 1300,
                    }}
                />
            )}
        </div>
    );
}

export default AbsentList;
