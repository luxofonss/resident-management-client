import { Table, Tag, Space } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentList.module.sass';
import { LAY_HK, LAY_NK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IconEdit, IconTrash } from '~/assets/svgs';
import { Link } from 'react-router-dom';
import { isEmptyValue } from '~/helpers/check';

const cx = classNames.bind(styles);

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
        title: 'Hành động',
        key: 'id',
        fixed: 'right',
        width: 230,
        render: (_, record) => (
            <div className={cx('action-wrapper')}>
                <div className={cx('action-icon')}>
                    <Link to={`/resident/edit/:${record.id}`}>
                        <IconEdit width={14} height={14} />
                    </Link>
                </div>
                {/* <div className={cx('action-icon')}>
                    <Link to={`/resident/delete/:${record.id}`}>
                        <IconTrash width={14} height={14} />
                    </Link>
                </div> */}

                {isEmptyValue(record.chu_ho_id) && <Link to={`/household/add-resident/${record.id}`}>Nhập khẩu</Link>}

                <Link to={`/resident/death/:${record.id}`}>Khai tử</Link>
            </div>
        ),
    },
];

function ResidentList(props) {
    const dispatch = useDispatch();
    const danhSachNK = useSelector((state) => {
        console.log('state: ', state);
        return state.resident.list;
    });
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
                    chu_ho_id: nk.chu_ho_id,
                },
            ];
        });
    }
    console.log(data);
    useEffect(() => {
        dispatch(LAY_NK());
    }, []);
    return (
        <div>
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
