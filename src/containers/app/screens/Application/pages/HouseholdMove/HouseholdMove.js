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
                description: 'Ph?? duy???t th??nh c??ng!',
            });
            dispatch(LAY_DON({ type: 'don_chuyen_khau' }));
        }
        if (acpChuyenKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Ph?? duy???t th???t b???i!',
            });
        }
        dispatch(ACCEPT_CHUYEN_KHAU_RESET());
    }, [acpChuyenKhau?.state]);

    useEffect(() => {
        let ignore = false;
        if (rejectChuyenKhau.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: '???? t??? ch???i ????n!',
            });
            dispatch(LAY_DON({ type: 'don_tach_khau' }));
        }
        if (rejectChuyenKhau?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'T??? ch???i ????n th???t b???i!',
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
            title: 'Ng?????i ?????i di???n',
            dataIndex: 'dai_dien_id',
            key: 'dai_dien_id',
            width: 150,
        },

        {
            title: 'S??? h??? kh???u c??',
            dataIndex: 'so_ho_khau_cu',
            key: 'so_ho_khau_cu',
            width: 100,
        },
        {
            title: 'S??? h??? kh???u m???i',
            dataIndex: 'so_ho_khau_moi',
            key: 'so_ho_khau_moi',
            width: 100,
        },
        {
            title: 'Ng??y l??m ????n',
            dataIndex: 'ngay_lam_don',
            key: 'ngay_lam_don',
            width: 120,
        },
        {
            title: 'Ng??y ph?? duy???t',
            dataIndex: 'ngay_phe_duyet',
            key: 'ngay_phe_duyet',
            width: 120,
        },
        {
            title: 'Ng??y chuy???n',
            dataIndex: 'ngay_chuyen',
            key: 'ngay_chuyen',
            width: 120,
        },
        // {
        //     title: 'Ng?????i ph?? duy???t',
        //     dataIndex: 'user_phe_duyet',
        //     key: 'user_phe_duyet',
        //     width: 120,
        // },
        {
            title: 'L?? do',
            dataIndex: 'ly_do',
            key: 'ly_do',
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

                          {/* <Button onClick={() => handleAccept(record.id)}>Ph?? duy???t</Button> */}
                      </div>
                  ),
              }
            : {},
    ];

    useEffect(() => {
        document.title = '????n chuy???n kh???u';
    }, []);

    return (
        <div>
            {/* <Tooltip color="cyan" placement="top" title={<span>????nh ch??nh</span>} arrow={mergedArrow}></Tooltip> */}
            <div className="page-header">????n chuy???n kh???u</div>

            {dons.state === REQUEST_STATE.SUCCESS && <Table dataSource={dataSourceInput} columns={columns} />}
        </div>
    );
}

export default HouseholdMove;

export const apiTaoUser = async (params) => {
    try {
        const response = await POST(`/user/new`, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error,
            state: REQUEST_STATE.ERROR,
            data: {},
        };
    }
};
