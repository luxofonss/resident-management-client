import { Table, Tag, Space, notification, Button, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import styles from './AbsentList.module.sass';
import {
    ACCEPT_TAM_TRU_RESET,
    ACCEPT_TAM_VANG,
    ACCEPT_TAM_VANG_RESET,
    LAY_TAM_VANG,
    REJECT_TAM_TRU_RESET,
    REJECT_TAM_VANG,
    REJECT_TAM_VANG_RESET,
} from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { CheckIcon, IconEdit, IconTrash, XCircleIcon } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { REQUEST_STATE, USER_ROLE } from '~/app-configs';
import { ACCEPT_CHUYEN_KHAU_RESET } from '../../../Application/redux/action';

const cx = classNames.bind(styles);

function AbsentList(props) {
    const dispatch = useDispatch();
    const tamVangList = useSelector((state) => {
        return state.temporaryAbsent.tamVangList;
    });
    const tamVangAcp = useSelector((state) => {
        return state.temporaryAbsent.acpTamVang;
    });
    const tamVangReject = useSelector((state) => {
        return state.temporaryAbsent.rejectTamVang;
    });
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });
    const user = useSelector((state) => state.user?.profile);

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
        dispatch(ACCEPT_TAM_VANG({ id: id }));
    };

    const handleReject = (id) => {
        dispatch(REJECT_TAM_VANG({ id: id }));
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
                ho: tamvang.ho,
                ten_dem: tamvang.ten_dem,
                ten: tamvang.ten,
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
                ngay_het_han: tamvang.ngay_het_han.slice(0, 10),
                ngay_lam_don: tamvang.ngay_lam_don.slice(0, 10),
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
                description: 'Ph?? duy???t th??nh c??ng!',
            });
        }
        if (tamVangAcp?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Ph?? duy???t th???t b???i!',
            });
        }
        dispatch(ACCEPT_TAM_VANG_RESET());
        dispatch(LAY_TAM_VANG({ type: 'don_tam_vang' }));
    }, [tamVangAcp?.state]);

    useEffect(() => {
        let ignore = false;

        if (tamVangReject.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'T??? ch???i th??nh c??ng!',
            });
        }
        if (tamVangReject?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'T??? ch???i th???t b???i!',
            });
        }
        dispatch(REJECT_TAM_VANG_RESET());
        dispatch(LAY_TAM_VANG({ type: 'don_tam_vang' }));
    }, [tamVangReject?.state]);

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
            width: 180,
            render: (_, { ho, ten, ten_dem }) => {
                return ho + ' ' + ten_dem + ' ' + ten;
            },
            key: 'fullName',
            fixed: 'left',
        },

        {
            title: 'L?? do',
            dataIndex: 'ly_do',
            key: 'ly_do',
        },
        {
            title: '?????a ch??? t???m tr??',
            dataIndex: 'dia_chi_tam_chu',
            key: 'dia_chi_tam_chu',
        },
        {
            title: 'S??? h??? kh???u',
            dataIndex: 'so_ho_khau_id',
            key: 'so_ho_khau_id',
        },
        // {
        //     title: 'Ngu???i ph?? duy???t',
        //     dataIndex: 'user_phe_duyet',
        //     key: 'user_phe_duyet',
        // },
        {
            title: 'Ng??y l??m ????n',
            width: 120,
            render: (_, record) => record.ngay_lam_don.slice(0, 10),

            key: 'ngay_lam_don',
            sorter: true,
        },
        {
            title: 'Ng??y ph?? duy???t',
            width: 120,
            render: (_, record) => record.ngay_phe_duyet?.slice(0, 10),

            key: 'ngay_phe_duyet',
            sorter: true,
        },
        {
            title: 'Ng??y h???t h???n',
            width: 120,
            render: (_, record) => record.ngay_het_han?.slice(0, 10),

            key: 'ngay_het_han',
            sorter: true,
        },
        {
            title: 'Ghi ch??',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
        },
        {
            title: 'Tr???ng th??i',
            key: 'trang_thai',
            dataIndex: 'trang_thai',
            width: 120,
            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : trang_thai === 'TU_CHOI' ? 'red' : ''}>
                        {trang_thai === 'PHE_DUYET'
                            ? '???? ph?? duy???t'
                            : trang_thai === 'TU_CHOI'
                            ? 'T??? ch???i'
                            : trang_thai === 'HUY_BO'
                            ? '???? h???y'
                            : 'Ch??a x??? l??'}
                    </Tag>
                </>
            ),
        },

        user.roles === USER_ROLE.ADMIN
            ? {
                  title: 'H??nh ?????ng',
                  key: 'id',
                  fixed: 'right',
                  width: 100,
                  render: (_, record) => (
                      <div
                          style={
                              record.trang_thai === 'TAO_MOI'
                                  ? {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }
                                  : { display: 'none' }
                          }
                          className={cx('action-wrapper')}
                      >
                          {/* <Button onClick={() => handleAccept(record.id)}>Ph?? duy???t</Button>
                          <Button danger onClick={() => handleReject(record.id)}>
                              T??? ch???i
                          </Button> */}
                          {/* <Button onClick={() => handleAccept(record.id)}>Ph?? duy???t</Button> */}
                          <Tooltip
                              style={{ cursor: 'poiner' }}
                              onClick={() => handleAccept(record.id)}
                              color="cyan"
                              placement="top"
                              title={<span>Ph?? duy???t</span>}
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
                              title={<span>T??? ch???i</span>}
                              arrow={mergedArrow}
                          >
                              <div style={{ cursor: 'pointer' }}>
                                  <XCircleIcon stroke="red" />
                              </div>
                          </Tooltip>
                      </div>
                  ),
              }
            : {},
    ];

    useEffect(() => {
        document.title = 'Danh s??ch ????n t???m v???ng';
    }, []);
    return (
        <div>
            <div className="page-header">Danh s??ch ????n t???m v???ng</div>
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
