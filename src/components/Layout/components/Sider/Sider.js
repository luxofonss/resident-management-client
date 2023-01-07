import { AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import { getNavItem } from '~/components/Layout/AppLayout/AppLayout';

const { Sider, Content } = Layout;

const sliderItems = [
    getNavItem('Tài khoản', 'account', <UserOutlined />, [
        getNavItem('Danh sách tài khoản', '/accounts/list'),
        getNavItem('Thêm tài khoản', '/accounts/add'),
    ]),
    getNavItem('Cấu hình chứng chỉ', '/config/select-ceft', <AppstoreOutlined />, null),
    getNavItem('Cấu hình hợp đồng', '/config/blockchain', <SettingOutlined />, null),
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
