import { Table, Tag, Space, Button, Tooltip, Row, Col } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentList.module.sass';
import { LAY_HK, LAY_NK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { IconEdit, IconTrash } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { isEmptyValue } from '~/helpers/check';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import AppDateInput from '~/components/AppDateInput';
import AppSelectInput from '~/components/AppSelectInput';
import AppButton from '~/components/AppButton/AppButton';

const cx = classNames.bind(styles);

function ResidentList(props) {
    const dispatch = useDispatch();

    const danhSachNK = useSelector((state) => {
        console.log('state: ', state);
        return state.resident.list;
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

    let data = [];
    console.log('dsNK', danhSachNK);
    if (danhSachNK.state === 'SUCCESS') {
        console.log('test: ', danhSachNK.data?.data);
        danhSachNK.data?.data.forEach((nk, index) => {
            data = [
                ...data,
                {
                    key: nk.key,
                    stt: index + 1,
                    name: nk.ho + ' ' + nk.ten_dem + ' ' + nk.ten,
                    ngay_sinh: nk.ngay_sinh.slice(0, 10),
                    cccd: nk.cccd,
                    dan_toc: nk.dan_toc,
                    gioi_tinh: nk.gioi_tinh,
                    nguyen_quan: nk.nguyen_quan,
                    nghe_nghiep: nk.nghe_nghiep,
                    noi_lam_viec: nk.noi_lam_viec,
                    active: nk.active,
                    id: nk.id,
                    chu_ho_id: nk.chu_ho_id,
                },
            ];
        });
    }

    useEffect(() => {
        dispatch(LAY_NK());
    }, []);

    const columns = [
        {
            title: 'STT',
            width: 60,
            dataIndex: 'stt',
            key: 'stt',
            fixed: 'left',
        },
        {
            title: 'Full Name',
            width: 180,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Ng??y sinh',
            width: 120,
            dataIndex: 'ngay_sinh',
            key: 'ngay_sinh',
            sorter: true,
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
            width: 100,
        },
        {
            title: 'D??n t???c',
            dataIndex: 'dan_toc',
            key: 'dan_toc',
            width: 100,
        },
        {
            title: 'Gi???i t??nh',
            // dataIndex: 'gioi_tinh',
            render: (_, { gioi_tinh }) => {
                if (gioi_tinh === 0) return 'N???';
                else {
                    return 'Nam';
                }
            },
            key: 'gioi_tinh',
            width: 90,
        },
        {
            title: 'Nguy??n qu??n',
            dataIndex: 'nguyen_quan',
            key: 'nguyen_quan',
            width: 350,
        },
        {
            title: 'Ngh??? nghi???p',
            dataIndex: 'nghe_nghiep',
            key: 'nghe_nghiep',
            width: 100,
        },
        {
            title: 'N??i l??m vi???c',
            dataIndex: 'noi_lam_viec',
            key: 'noi_lam_viec',
            width: 150,
        },
        {
            title: 'Tr???ng th??i',
            key: 'active',
            dataIndex: 'active',
            width: 100,

            render: (_, { active }) => (
                <>
                    <Tag color={active === 1 ? 'geekblue' : 'volcano'}>{active === 1 ? 'ACTIVE' : 'INACTIVE'}</Tag>
                </>
            ),
        },

        {
            title: 'H??nh ?????ng',
            key: 'id',
            // fixed: 'right',
            width: 320,
            render: (_, record) => (
                <div className={cx('action-wrapper')}>
                    <Link to={`/resident/history/${record.id}`}>
                        <Button>L???ch s??? </Button>
                    </Link>
                    {isEmptyValue(record.chu_ho_id) && (
                        <Link to={`/household/add-resident/${record.id}`}>
                            <Button>Nh???p kh???u </Button>
                        </Link>
                    )}
                    <Link to={`/temporary-absent/new-absent?id=${record.id}`}>
                        <Button>T???m v???ng</Button>
                    </Link>
                </div>
            ),
        },
        {
            title: '',
            key: 'delete',
            // fixed: 'right',
            width: 80,
            render: (_, record) => (
                <div className={cx('action-wrapper')}>
                    <div className={cx('action-icon')}>
                        <Tooltip color="cyan" placement="top" title={<span>????nh ch??nh</span>} arrow={mergedArrow}>
                            <Link to={`/resident/edit/:${record.id}`}>
                                <IconEdit width={14} height={14} />
                            </Link>
                        </Tooltip>
                    </div>

                    <Tooltip color="cyan" placement="top" title={<span>Khai t???</span>} arrow={mergedArrow}>
                        <Link to={`/resident/death/:${record.id}`}>
                            <IconTrash width={14} height={14} />
                        </Link>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const onFilter = (data) => {
        dispatch(LAY_NK(data));
    };

    useEffect(() => {
        document.title = 'Danh s??ch nh??n kh???u';
    }, []);
    return (
        <div>
            <div className="page-header">Danh s??ch nh??n kh???u</div>
            <div style={{ marginBottom: '24px' }}>
                <AppForm onSubmit={onFilter}>
                    <Row gutter={12}>
                        {/* <Col xs={4}>
                            <AppInput name="id" type="number" label="ID" />
                        </Col> */}
                        <Col xs={4}>
                            <AppInput name="ten" label="H??? v?? t??n" />
                        </Col>
                        <Col xs={5}>
                            <AppDateInput name="ngay_sinh" label="Ng??y sinh" />
                        </Col>
                        <Col xs={5}>
                            <AppInput name="cccd" type="number" label="CCCD" />
                        </Col>
                        <Col xs={5}>
                            <AppInput name="dan_toc" label="D??n t???c" />
                        </Col>
                        <Col xs={5}>
                            <AppSelectInput
                                name="gioi_tinh"
                                label="Gi???i t??nh"
                                options={{
                                    options: [
                                        { name: 'Nam', value: 0 },
                                        { name: 'N???', value: 1 },
                                    ],
                                }}
                            />
                        </Col>
                        <Col xs={4}>
                            <AppInput name="que_quan" label="Qu?? qu??n" />
                        </Col>
                        <Col xs={5}>
                            <AppInput name="nghe_nghiep" label="Ngh??? nghi???p" />
                        </Col>
                        <Col xs={5}>
                            <AppInput name="noi_lam_viec" label="N??i l??m vi???c" />
                        </Col>
                        <Col xs={5}>
                            <AppSelectInput
                                name="active"
                                label="Tr???ng th??i"
                                options={{
                                    options: [
                                        { name: 'Ho???t ?????ng', value: 1 },
                                        { name: 'Kh??ng ho???t ?????ng', value: 0 },
                                    ],
                                }}
                            />
                        </Col>
                        <Col xs={5}>
                            <div className="bottom-right">
                                <AppButton type="submit">T??m ki???m</AppButton>
                            </div>
                        </Col>
                    </Row>
                </AppForm>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                scroll={{
                    x: 1300,
                }}
            />
        </div>
    );
}

export default ResidentList;
