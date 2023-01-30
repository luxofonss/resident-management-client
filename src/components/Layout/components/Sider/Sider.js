import {
    DiffOutlined,
    HomeOutlined,
    SplitCellsOutlined,
    UnorderedListOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';

import { getNavItem } from '~/components/Layout/AppLayout/AppLayout';
import './Sider.sass';

const { Sider, Content } = Layout;

const sliderItems = [
    getNavItem('Hộ khẩu', '/household', <HomeOutlined />, [
        getNavItem('Thêm hộ khẩu mới', '/household/create', <UsergroupAddOutlined />),
        getNavItem('Danh sách hộ khẩu', '/household/list', <UnorderedListOutlined />),
        getNavItem('Chuyển hộ khẩu', '/household/move', <UsergroupDeleteOutlined />),
        getNavItem('Tách hộ khẩu', '/household/separate', <SplitCellsOutlined />),
    ]),
    getNavItem('Nhân khẩu', 'resident', <UserOutlined />, [
        getNavItem('Thêm nhân khẩu mới', '/resident/create', <UsergroupAddOutlined />),
        getNavItem('Khai sinh', '/resident/create-child', <UsergroupAddOutlined />),
        getNavItem('Danh sách nhân khẩu', '/resident/list', <UnorderedListOutlined />),
    ]),
    getNavItem('Tạm trú tạm vắng', 'temporary-absent', <DiffOutlined />, [
        getNavItem('Khai báo tạm vắng', '/temporary-absent/new-absent', <UsergroupAddOutlined />),
        getNavItem('Khai báo tạm trú', '/temporary-absent/new-temporary', <UsergroupAddOutlined />),
        getNavItem('Danh sách tạm vắng', '/temporary-absent/absent-list', <UnorderedListOutlined />),
        getNavItem('Danh sách tạm trú', '/temporary-absent/temporary-list', <UnorderedListOutlined />),
    ]),
    getNavItem('Quản lý cơ sở vật chất', 'infrastructure', <WalletOutlined />, null),
];

export default function AppSider(props) {
    const currentRouter = useSelector((state) => state.router.location);
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(localStorage.getItem(SIDER_COLLAPSE) ?? false);
    const [selectedSider, setSelectedSider] = useState(getSelectedNav());

    const onClickSliderMenu = (item) => {
        history.push(item.key);
    };

    function getSelectedNav() {
        return currentRouter?.pathname;
    }

    useEffect(() => {
        console.log('selectedSider: ', selectedSider);
    }, [selectedSider]);

    return (
        <Sider
            theme="dark"
            style={{
                border: 'none',
                minHeight: '100vh',
            }}
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                >
                    LOGO
                </div>
                <div style={{ marginTop: '10px', flex: '1' }}>
                    <Menu
                        mode="inline"
                        // theme="dark"
                        theme="dark"
                        defaultOpenKeys={['account']}
                        defaultSelectedKeys={['1']}
                        selectedKeys={[selectedSider]}
                        items={sliderItems}
                        onClick={onClickSliderMenu}
                    />
                </div>
                <div
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        marginBottom: '15px',
                        fontSize: '12px',
                    }}
                >
                    © Luxofons {new Date().getFullYear()}
                </div>
            </div>
        </Sider>
    );
}
