import { Col, notification, Row, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import styles from './HouseholdDetail.module.sass';
import { LAY_HK, UPDATE_HK, UPDATE_HK_RESET } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LAY_NK } from '../../../Resident/redux/action';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import { IconEdit, IconTrash } from '~/assets/svgs';
import AppButton from '~/components/AppButton/AppButton';
import { REQUEST_STATE } from '~/app-configs';

const cx = classNames.bind(styles);

function HouseholdDetail(props) {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const danhSachHoKhau = useSelector((state) => {
        return state.household?.danhSach;
    });
    const updateHK = useSelector((state) => state.household.updateHK);

    const danhSachNhanKhau = useSelector((state) => {
        return state.resident?.list;
    });
    const { id } = useParams();
    let data = [];

    if (danhSachHoKhau?.data?.data) {
        danhSachHoKhau?.data?.data.forEach((hk) => {
            data = [
                ...data,
                {
                    key: hk.id,
                    householdNumber: hk.id,
                    head: hk.ten_chu_ho,
                    address: hk.dia_chi,
                    id: hk.chu_ho_id,
                },
            ];
        });
    }

    useEffect(() => {
        dispatch(LAY_HK({ cccd: id }));
        // dispatch(LAY_NK({ ids: danhSachHoKhau?.data?.data[0].nhanKhau }));
    }, []);

    useEffect(() => {
        dispatch(LAY_NK({ ids: danhSachHoKhau?.data?.data[0].nhanKhau }));
    }, [danhSachHoKhau?.data?.data[0]?.nhanKhau]);

    const columnsResident = [
        {
            title: 'STT',
            width: 60,
            dataIndex: 'stt',
            key: 'stt',
            fixed: 'left',
        },
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Ngày sinh',
            width: 120,
            dataIndex: 'ngay_sinh',
            key: 'ngay_sinh',
            sorter: true,
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Dân tộc',
            dataIndex: 'dan_toc',
            key: 'dan_toc',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioi_tinh',
            key: 'gioi_tinh',
            width: 100,
        },
        {
            title: 'Nguyên quán',
            dataIndex: 'nguyen_quan',
            key: 'nguyen_quan',
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'nghe_nghiep',
            key: 'nghe_nghiep',
        },
        {
            title: 'Nơi làm việc',
            dataIndex: 'noi_lam_viec',
            key: 'noi_lam_viec',
        },
        {
            title: 'Hoạt động',
            key: 'active',
            dataIndex: 'active',
            render: (_, { active }) => (
                <>
                    <Tag color={active === 1 ? 'geekblue' : 'volcano'}>{active === 1 ? 'ACTIVE' : 'INACTIVE'}</Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'id',
            fixed: 'right',
            width: 150,
            render: (_, { id }) => (
                <div className={cx('action-wrapper')}>
                    <div className={cx('action-icon')}>
                        <Link to={`/resident/edit/:${id}`}>
                            <IconEdit width={14} height={14} />
                        </Link>
                    </div>
                    <div className={cx('action-icon')}>
                        <Link to={`/resident/delete/:${id}`}>
                            <IconTrash width={14} height={14} />
                        </Link>
                    </div>
                    <Link to={`/resident/death/:${id}`}>Khai tử</Link>
                </div>
            ),
        },
    ];

    let dataNK = [];
    if (danhSachNhanKhau.state === 'SUCCESS') {
        console.log('test: ', danhSachNhanKhau.data?.data);
        danhSachNhanKhau.data?.data.forEach((nk, index) => {
            dataNK = [
                ...dataNK,
                {
                    key: nk.key,
                    stt: index + 1,
                    name: nk.ho + nk.ten_dem + nk.ten,
                    ngay_sinh: nk.ngay_sinh.slice(0, 10),
                    ccdd: nk.ccdd,
                    dan_toc: nk.dan_toc,
                    gioi_tinh: nk.gioi_tinh,
                    nguyen_quan: nk.nguyen_quan,
                    nghe_nghiep: nk.nghe_nghiep,
                    noi_lam_viec: nk.noi_lam_viec,
                    active: nk.active,
                    id: nk.id,
                },
            ];
        });
    }

    const onUpdate = (data) => {
        console.log(data);
        let updateData;
        updateData = { so_ho_khau_id: danhSachHoKhau?.data?.data[0].id, mo_ta: `{\"dia_chi\": \"${data.address}\"}` };
        dispatch(UPDATE_HK(updateData));
        setEdit(false);
    };

    useEffect(() => {
        if (updateHK.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Yêu cầu sửa hộ khẩu thành công!',
            });
        }
        if (updateHK?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Yêu cầu sửa hộ khẩu thất bại!',
            });
        }
        dispatch(UPDATE_HK_RESET());
    }, [updateHK?.state]);

    return (
        <div>
            {danhSachHoKhau?.data?.data[0] && (
                <div>
                    <AppForm onSubmit={onUpdate}>
                        <Row gutter={36}>
                            <Col xs={2}>
                                <AppInput
                                    disabled={edit ? false : true}
                                    label="ID"
                                    name="id"
                                    value={danhSachHoKhau?.data?.data[0].id}
                                />
                            </Col>
                            <Col xs={6}>
                                <AppInput
                                    disabled={edit ? false : true}
                                    label="Chủ hộ"
                                    defaultValue={danhSachHoKhau?.data?.data[0].ten_chu_ho}
                                />
                            </Col>
                            <Col xs={6}>
                                <AppInput
                                    label="Địa chỉ thường trú"
                                    name="address"
                                    defaultValue={danhSachHoKhau?.data?.data[0].dia_chi}
                                    disabled={edit ? false : true}
                                />
                            </Col>

                            <Col xs={3}>
                                {edit === false && <AppButton onClick={() => setEdit(true)}>Chỉnh sửa</AppButton>}
                                {edit === true && <AppButton type="submit">Xác nhận</AppButton>}
                            </Col>
                        </Row>
                    </AppForm>
                </div>
            )}
            <div style={{ marginTop: '40px' }}>Thông tin các nhân khẩu</div>
            {danhSachNhanKhau.state === 'SUCCESS' && (
                <Table
                    dataSource={dataNK}
                    columns={columnsResident}
                    scroll={{
                        x: 1300,
                    }}
                />
            )}
        </div>
    );
}

export default HouseholdDetail;
