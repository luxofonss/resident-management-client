import { Button, notification, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE } from '~/app-configs';
import { LAY_HK } from '../../../Household/redux/action';
import { LAY_NK, LAY_NK_2 } from '../../../Resident/redux/action';
import {
    ACCEPT_CHUYEN_KHAU,
    ACCEPT_CHUYEN_KHAU_RESET,
    ACCEPTDINH_CHINHP_KHAU,
    ACCEPT_NHAPDINH_CHINHU_RESET,
    LAY_DON,
    ACCEPT_DINH_CHINH_KHAU,
    ACCEPT_DINH_CHINH_KHAU_RESET,
} from '../../redux/action';
import styles from './HouseholdUpdate.module.sass';

const cx = classNames.bind(styles);

function HouseholdUpdate(props) {
    const dispatch = useDispatch();
    const dons = useSelector((state) => state.application.list);
    const danhSachHoKhau = useSelector((state) => {
        return state.household?.danhSach;
    });
    const danhSachHoKhau2 = useSelector((state) => {
        return state.resident?.list2;
    });
    const acpNhapKhau = useSelector((state) => state.application.acpNhapKhau);

    console.log('danhSachHoKhau', danhSachHoKhau);

    const idList = [];
    const idPDList = [];
    const dataSourceInput = [];

    useEffect(() => {
        console.log('use');
        if (idList?.length === dons?.data?.length) dispatch(LAY_HK({ ids: idList }));
        if (idPDList?.length === dons?.data?.length) dispatch(LAY_NK_2({ ids: idPDList }));
    }, [dons.state]);

    if (dons.state === 'SUCCESS') {
        dons.data.forEach((don, index) => {
            idList.push(don.so_ho_khau_id);
            if (don.user_phe_duyet) {
                idPDList.push(don.user_phe_duyet);
            } else {
                idPDList.push(-1);
            }
        });
    }

    if (dons.state === 'SUCCESS' && danhSachHoKhau?.state === 'SUCCESS') {
        console.log('test: ', dons.data);

        dons.data.forEach((don, index) => {
            dataSourceInput.push({
                stt: index + 1,
                id: don.id,
                so_ho_khau_id: don.so_ho_khau_id,
                ghi_chu: don.ghi_chu,
                dai_dien_id: danhSachHoKhau?.data?.data[index]
                    ? danhSachHoKhau?.data?.data[index]?.ho +
                      ' ' +
                      danhSachHoKhau?.data?.data[index]?.ten_dem +
                      ' ' +
                      danhSachHoKhau?.data?.data[index]?.ten
                    : '',
                ly_do: don.ly_do,
                dia_chi_cu: don.dia_chi_cu,
                dia_chi_moi: don.dia_chi_moi,
                dia_chi_co_quan: don.dia_chi_co_quan,
                ngay_chuyen: don.ngay_chuyen?.slice(0, 10),
                ngay_lam_don: don.ngay_lam_don?.slice(0, 10),
                ngay_phe_duyet: don.ngay_phe_duyet?.slice(0, 10),
                trang_thai: don.trang_thai,
                user_phe_duyet:
                    idPDList[index] !== -1 && danhSachHoKhau2?.data?.data[index]?.ho
                        ? danhSachHoKhau2?.data?.data[index]?.ho +
                          ' ' +
                          danhSachHoKhau2?.data?.data[index]?.ten_dem +
                          ' ' +
                          danhSachHoKhau2?.data?.data[index]?.ten
                        : '',
            });
        });
    }

    useEffect(() => {
        dispatch(LAY_DON({ type: 'don_dinh_chinh_so_ho_khau' }));
    }, []);

    const handleAccept = (id) => {
        dispatch(ACCEPT_DINH_CHINH_KHAU({ id: id }));
    };

    useEffect(() => {
        let ignore = false;
        if (acpNhapKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Ph?? duy???t th??nh c??ng!',
            });
        }
        if (acpNhapKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Ph?? duy???t th???t b???i!',
            });
        }
        dispatch(ACCEPT_DINH_CHINH_KHAU_RESET());
        dispatch(LAY_DON({ type: 'don_dinh_chinh_so_ho_khau' }));
    }, [acpNhapKhau?.state]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'S??? h??? kh???u',
            dataIndex: 'so_ho_khau_id',
            key: 'so_ho_khau_id',
            width: 120,
        },
        {
            title: 'Ng??y l??m ????n',
            dataIndex: 'ngay_lam_don',
            key: 'ngay_lam_don',
            width: 140,
        },
        {
            title: 'Ng??y ph?? duy???t',
            dataIndex: 'ngay_phe_duyet',
            key: 'ngay_phe_duyet',
            width: 160,
        },

        // {
        //     title: 'Ng?????i ph?? duy???t',
        //     dataIndex: 'user_phe_duyet',
        //     key: 'user_phe_duyet',
        //     width: 170,
        // },
        // {
        //     title: 'Th??ng tin thay ?????i',
        //     key: 'mo_ta',
        //     width: 400,
        //     render: (_, record) => (
        //         <>
        //             <div>{record.mo_ta}</div>
        //         </>
        //     ),
        // },
        {
            title: 'Ghi ch??',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
            width: 250,
        },
        {
            title: 'Tr???ng th??i',
            key: 'trang_thai',
            dataIndex: 'trang_thai',
            width: 100,
            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : trang_thai === 'TU_CHOI' ? 'red' : 'volcano'}>
                        {trang_thai === 'PHE_DUYET'
                            ? '???? ph?? duy???t'
                            : trang_thai === 'TU_CHOI'
                            ? 'T??? ch???i'
                            : 'Ch??? ph?? duy???t'}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <div
                        style={record.trang_thai === 'TAO_MOI' ? {} : { display: 'none' }}
                        className={cx('action-wrapper')}
                    >
                        <Button onClick={() => handleAccept(record.id)}>Ph?? duy???t</Button>
                    </div> */}
                    <Link to={`/application/household/update/detail/${record.id}`}>
                        <Button>Xem chi ti???t</Button>
                    </Link>
                </div>
            ),
        },
    ];
    useEffect(() => {
        document.title = '????n ????nh ch??nh s??? h??? kh???u';
    }, []);
    return (
        <div>
            <div className="page-header">????n ????nh ch??nh s??? h??? kh???u</div>

            {dons.state === REQUEST_STATE.SUCCESS && <Table dataSource={dataSourceInput} columns={columns} />}
        </div>
    );
}

export default HouseholdUpdate;
