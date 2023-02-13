import { Button, notification, Table, Tag, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { REQUEST_STATE, USER_ROLE } from '~/app-configs';
import { CheckIcon, XCircleIcon } from '~/assets/svgs';
import { LAY_NK, LAY_NK_2 } from '../../../Resident/redux/action';
import {
    ACCEPT_CHUYEN_KHAU,
    ACCEPT_CHUYEN_KHAU_RESET,
    LAY_DON,
    REJECT_CHUYEN_KHAU,
    REJECT_CHUYEN_KHAU_RESET,
} from '../../redux/action';
import styles from './HouseholdMove.module.sass';

const cx = classNames.bind(styles);

function HouseholdMove(props) {
    const dispatch = useDispatch();
    const dons = useSelector((state) => state.application.list);
    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });
    const user = useSelector((state) => state.user?.profile);
    const danhSachNhanKhau2 = useSelector((state) => {
        return state.resident?.list2;
    });
    const acpChuyenKhau = useSelector((state) => state.application.acpChuyenKhau);
    const rejectChuyenKhau = useSelector((state) => state.application.rejectChuyenKhau);

    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter)
            return {
                arrowPointAtCenter: true,
            };
        return showArrow;
    }, [showArrow, arrowAtCenter]);

    console.log('dons', dons);

    const idList = [];
    const idPDList = [];
    const dataSourceInput = [];

    useEffect(() => {
        console.log('use');
        if (idList?.length === dons?.data?.length) dispatch(LAY_NK({ ids: idList }));
        if (idPDList?.length === dons?.data?.length) dispatch(LAY_NK_2({ ids: idPDList }));
    }, [dons.state]);

    if (dons.state === 'SUCCESS') {
        dons.data.forEach((don, index) => {
            idList.push(don.dai_dien_id);
            if (don.user_phe_duyet) {
                idPDList.push(don.user_phe_duyet);
            } else {
                idPDList.push(-1);
            }
        });
    }
    if (dons.state === 'SUCCESS' && danhSachNhanKhau?.state === 'SUCCESS') {
        console.log('test: ', dons.data);

        dons.data.forEach((don, index) => {
            dataSourceInput.push({
                stt: index + 1,
                id: don.id,
                so_ho_khau_cu: don.so_ho_khau_cu,
                so_ho_khau_moi: don.so_ho_khau_moi,
                ghi_chu: don.ghi_chu,
                dai_dien_id: danhSachNhanKhau?.data?.data[index]
                    ? danhSachNhanKhau?.data?.data[index]?.ho +
                      ' ' +
                      danhSachNhanKhau?.data?.data[index]?.ten_dem +
                      ' ' +
                      danhSachNhanKhau?.data?.data[index]?.ten
                    : '',
                ly_do: don.ly_do,
                ngay_chuyen: don.ngay_chuyen?.slice(0, 10),
                ngay_lam_don: don.ngay_lam_don?.slice(0, 10),
                ngay_phe_duyet: don.ngay_phe_duyet?.slice(0, 10),
                trang_thai: don.trang_thai,
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
        dispatch(LAY_DON({ type: 'don_chuyen_khau' }));
    }, []);

    const handleAccept = (id) => {
        dispatch(ACCEPT_CHUYEN_KHAU({ id: id }));
    };

    const handleReject = (id) => {
        dispatch(REJECT_CHUYEN_KHAU({ id: id }));
    };

    useEffect(() => {
        let ignore = false;
        if (acpChuyenKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Phê duyệt thành công!',
            });
            dispatch(LAY_DON({ type: 'don_chuyen_khau' }));
        }
        if (acpChuyenKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Phê duyệt thất bại!',
            });
        }
        dispatch(ACCEPT_CHUYEN_KHAU_RESET());
    }, [acpChuyenKhau?.state]);

    useEffect(() => {
        let ignore = false;
        if (rejectChuyenKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Đã từ chối đơn!',
            });
            dispatch(LAY_DON({ type: 'don_tach_khau' }));
        }
        if (rejectChuyenKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Từ chối đơn thất bại!',
            });
        }
        dispatch(REJECT_CHUYEN_KHAU_RESET());
    }, [rejectChuyenKhau?.state]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Người đại diện',
            dataIndex: 'dai_dien_id',
            key: 'dai_dien_id',
            width: 150,
        },

        {
            title: 'Sổ hộ khẩu cũ',
            dataIndex: 'so_ho_khau_cu',
            key: 'so_ho_khau_cu',
            width: 100,
        },
        {
            title: 'Sổ hộ khẩu mới',
            dataIndex: 'so_ho_khau_moi',
            key: 'so_ho_khau_moi',
            width: 100,
        },
        {
            title: 'Ngày làm đơn',
            dataIndex: 'ngay_lam_don',
            key: 'ngay_lam_don',
            width: 120,
        },
        {
            title: 'Ngày phê duyệt',
            dataIndex: 'ngay_phe_duyet',
            key: 'ngay_phe_duyet',
            width: 120,
        },
        {
            title: 'Ngày chuyển',
            dataIndex: 'ngay_chuyen',
            key: 'ngay_chuyen',
            width: 120,
        },
        // {
        //     title: 'Người phê duyệt',
        //     dataIndex: 'user_phe_duyet',
        //     key: 'user_phe_duyet',
        //     width: 120,
        // },
        {
            title: 'Lý do',
            dataIndex: 'ly_do',
            key: 'ly_do',
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
            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'PHE_DUYET' ? 'geekblue' : trang_thai === 'TU_CHOI' ? 'red' : 'volcano'}>
                        {trang_thai === 'PHE_DUYET'
                            ? 'Đã phê duyệt'
                            : trang_thai === 'TU_CHOI'
                            ? 'Từ chối'
                            : 'Chờ phê duyệt'}
                    </Tag>
                </>
            ),
        },
        user.roles === USER_ROLE.ADMIN
            ? {
                  title: 'Action',
                  key: 'action',
                  fixed: 'right',
                  width: 90,
                  render: (_, record) => (
                      <div
                          style={record.trang_thai === 'TAO_MOI' ? {} : { display: 'none' }}
                          className={cx('action-wrapper')}
                      >
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

                          {/* <Button onClick={() => handleAccept(record.id)}>Phê duyệt</Button> */}
                      </div>
                  ),
              }
            : {},
    ];
    return (
        <div>
            <Tooltip color="cyan" placement="top" title={<span>Đính chính</span>} arrow={mergedArrow}></Tooltip>
            {dons.state === REQUEST_STATE.SUCCESS && <Table dataSource={dataSourceInput} columns={columns} />}
        </div>
    );
}

export default HouseholdMove;
