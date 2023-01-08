import { Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './HouseholdList.module.sass';

const cx = classNames.bind(styles);

const dataSource = [
    {
        key: '1',
        householdNumber: 125124,
        head: 'Nguyễn Văn A',
        address: '10 Downing Street',
    },
    {
        key: '2',
        householdNumber: 124234,
        head: 'Nguyễn Văn B',
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Số hộ khẩu',
        dataIndex: 'householdNumber',
        key: 'householdNumber',
    },
    {
        title: 'Họ và tên chủ hộ',
        dataIndex: 'head',
        key: 'head',
    },
    {
        title: 'Địa chỉ thường trú',
        dataIndex: 'address',
        key: 'address',
    },
];

function HouseholdList(props) {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default HouseholdList;
