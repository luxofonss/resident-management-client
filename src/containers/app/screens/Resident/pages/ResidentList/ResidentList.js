import { Table, Tag, Space } from 'antd';
import classNames from 'classnames/bind';
import styles from './ResidentList.module.sass';
import { LAY_HK, LAY_NK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
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
    // {
    //     title: 'Column 7',
    //     dataIndex: 'address',
    //     key: '7',
    // },
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
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
    },
];
const data2 = [
    {
        key: '1',
        stt: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
        tags: [1],
    },
    {
        key: '2',
        stt: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
        tags: [0],
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
        console.log('test: ', danhSachNK.data?.data.data);
        danhSachNK.data?.data.data.forEach((nk, index) => {
            data = [
                ...data,
                {
                    key: nk.key,
                    stt: index + 1,
                    name: nk.ho + nk.ten_dem + nk.ten,
                    age: 'chua xu ly',
                    ccdd: nk.ccdd,
                    dan_toc: nk.dan_toc,
                    gioi_tinh: nk.gioi_tinh,
                    nguyen_quan: nk.nguyen_quan,
                    nghe_nghiep: nk.nghe_nghiep,
                    noi_lam_viec: nk.noi_lam_viec,
                    active: nk.active,
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
