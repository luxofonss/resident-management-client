import { Table, Tag, Space, notification, Button, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import styles from './TemporaryList.module.sass';
import {
    ACCEPT_TAM_TRU,
    ACCEPT_TAM_TRU_RESET,
    LAY_TAM_TRU,
    REJECT_TAM_TRU,
    REJECT_TAM_TRU_RESET,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { CheckIcon, IconEdit, IconTrash, XCircleIcon } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_NK, LAY_NK_2 } from '../../../Resident/redux/action';

const cx = classNames.bind(styles);

function TemporaryList(props) {
    const [state, setState] = useState(false);
    const [listDone, setListDone] = useState(false);
    const dispatch = useDispatch();
    const tamTruList = useSelector((state) => {
        return state.temporaryAbsent.tamTruList;
    });
    const acpTamTru = useSelector((state) => {
        return state.temporaryAbsent.acpTamTru;
    });
    const rejectTamTru = useSelector((state) => {
        return state.temporaryAbsent.rejectTamTru;
    });
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });

    const danhSachNhanKhau2 = useSelector((state) => {
        return state.resident?.list2;
    });

    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter)
            return {
                arrowPointAtCenter: true,
            };
        return showArrow;
    }, [showArrow, arrowAtCenter]);

    const handleAccept = (id) => {
        dispatch(ACCEPT_TAM_TRU({ id: id }));
    };

    const handleReject = (id) => {
        dispatch(REJECT_TAM_TRU({ id: id }));
    };

    useEffect(() => {
        let ignore = false;
        if (acpTamTru.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
        }
        if (acpTamTru?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        dispatch(ACCEPT_TAM_TRU_RESET());
        dispatch(LAY_TAM_TRU({ type: 'don_tam_tru' }));
    }, [acpTamTru?.state]);

    useEffect(() => {
        let ignore = false;
        if (rejectTamTru.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Từ chối thành công!',
            });
        }
        if (rejectTamTru?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Từ chối thất bại!',
            });
        }
        dispatch(REJECT_TAM_TRU_RESET());
        dispatch(LAY_TAM_TRU({ type: 'don_tam_tru' }));
    }, [rejectTamTru?.state]);

    console.log('tamTruList', tamTruList);
    useEffect(() => {
        dispatch(LAY_TAM_TRU({ type: 'don_tam_tru' }));
    }, [acpTamTru?.state]);

    const idList = [];
    const idPDList = [];

    useEffect(() => {
        console.log('use');
        if (idList?.length === tamTruList?.data?.length) dispatch(LAY_NK({ ids: idList }));
        if (idPDList?.length === tamTruList?.data?.length) dispatch(LAY_NK_2({ ids: idPDList }));
    }, [tamTruList.state]);

    console.log('danhSachNhanKhau', danhSachNhanKhau);

    const dataSource = [];

    console.log('idList', idList);
    if (tamTruList.state === 'SUCCESS') {
        tamTruList.data.forEach((tamtru, index) => {
            idList.push(tamtru.nhan_khau_id);
            if (tamtru.user_phe_duyet) {
                idPDList.push(tamtru.user_phe_duyet);
            } else {
                idPDList.push(-1);
            }
        });
    }
    if (tamTruList.state === 'SUCCESS' && danhSachNhanKhau.state === 'SUCCESS') {
        console.log('test: ', tamTruList.data);

        tamTruList.data.forEach((tamtru, index) => {
            dataSource.push({
                stt: index + 1,
                key: tamtru.key,
                ho: tamtru.ho,
                ten: tamtru.ten,
                ten_dem: tamtru.ten_dem,
                dia_chi_tam_tru: tamtru.dia_chi_tam_tru,
                dia_chi_thuong_tru: tamtru.dia_chi_thuong_tru,
                ghi_chu: tamtru.ghi_chu,
                id: tamtru.id,
                fullName: danhSachNhanKhau?.data?.data[index]
                    ? danhSachNhanKhau?.data?.data[index]?.ho +
                      ' ' +
                      danhSachNhanKhau?.data?.data[index]?.ten_dem +
                      ' ' +
                      danhSachNhanKhau?.data?.data[index]?.ten
                    : '',
                ly_do: tamtru.ly_do,
                ngay_het_han: tamtru.ngay_het_han.slice(0, 10),
                ngay_lam_don: tamtru.ngay_lam_don.slice(0, 10),
                ngay_phe_duyet: tamtru.ngay_phe_duyet?.slice(0, 10),
                ngay_tam_tru: tamtru.ngay_tam_tru,
                nhan_khau_id: tamtru.nhan_khau_id,
                trang_thai: tamtru.trang_thai,
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

    console.log('dataSource', dataSource);

    const columns = [
        {
            title: 'STT',
            width: 60,
            // dataIndex: 'stt',
            render: (_, record, index) => index + 1,
            key: 'stt',
            fixed: 'left',
        },
        {
            title: 'Full Name',
            width: 150,
            // dataIndex: 'fullName',
            render: (_, { ho, ten, ten_dem }) => {
                return ho + ' ' + ten_dem + ' ' + ten;
            },
            key: 'fullName',
            fixed: 'left',
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
            title: 'Ngày làm đơn',
            width: 120,
            render: (_, record) => record.ngay_lam_don?.slice(0, 10),

            key: 'ngay_lam_don',
            sorter: true,
        },
        {
            title: 'Ngày phê duyệt',
            width: 120,
            render: (_, record) => record.ngay_phe_duyet?.slice(0, 10),

            key: 'ngay_phe_duyet',
            sorter: true,
        },
        {
            title: 'Ngày hết hạn',
            width: 120,
            render: (_, record) => record.ngay_het_han?.slice(0, 10),

            key: 'ngay_het_han',
            sorter: true,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
        },
        {
            title: 'Trạng thái',
            key: 'trang_thai',
            dataIndex: 'trang_thai',
            width: 120,
            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : trang_thai === 'TU_CHOI' ? 'red' : ''}>
                        {trang_thai === 'PHE_DUYET'
                            ? 'Đã phê duyệt'
                            : trang_thai === 'TU_CHOI'
                            ? 'Từ chối'
                            : 'Chưa xử lý'}
                    </Tag>
                </>
            ),
        },

        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <div
                    style={record.trang_thai === 'TAO_MOI' ? {} : { display: 'none' }}
                    className={cx('action-wrapper')}
                >
                    {/* <Button onClick={() => handleAccept(record.id)}>Phê duyệt</Button>
                    <Button danger onClick={() => handleReject(record.id)}>
                        Từ chối
                    </Button> */}
                    <Tooltip
                        style={{ cursor: 'poiner' }}
                        onClick={() => handleAccept(record.id)}
                        color="cyan"
                        placement="top"
                        title={<span>Phê duyệt</span>}
                        arrow={mergedArrow}
                    >
                        <div style={{ cursor: 'pointer' }}>
                            <CheckIcon stroke="green" />
                        </div>
                    </Tooltip>
                    <Tooltip
                        style={{ cursor: 'poiner' }}
                        onClick={() => handleReject(record.id)}
                        color="cyan"
                        placement="top"
                        title={<span>Từ chối</span>}
                        arrow={mergedArrow}
                    >
                        <div style={{ cursor: 'pointer' }}>
                            <XCircleIcon stroke="red" />
                        </div>
                    </Tooltip>
                </div>
            ),
        },
    ];
    useEffect(() => {
        document.title = 'Danh sách đơn tạm trú';
    }, []);
    return (
        <div>
            <div className="page-header">Khai báo tạm trú</div>
            {tamTruList.state === REQUEST_STATE.SUCCESS && (
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{
                        x: 1300,
                    }}
                />
            )}
        </div>
    );
}

export default TemporaryList;
