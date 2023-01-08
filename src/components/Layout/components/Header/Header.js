import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import { TOKEN_KEY } from '~/app-configs';
import UserAvatar from '~/assets/images/header/my-avatar.jpg';
import { getNavItem } from '~/components/Layout/AppLayout/AppLayout';
import styles from './Header.module.sass';
import classNames from 'classnames/bind';
import BellNotification from '~/components/BellNotification';

const cx = classNames.bind(styles);

const userDropdownItems = [getNavItem('Đăng xuất', '/auth/logout', <LogoutOutlined />, null)];

const onClickUserAvatar = (item) => {
    if (item?.key == '/auth/logout') {
        handleLogout();
    }
};

function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload(false);
}

export default function (props) {
    const userDetail = useSelector((state) => state?.user?.profile);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Header
            style={{
                padding: '0px 20px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div className="flex-center">Logo</div>

            <div
                style={{
                    marginRight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        marginRight: '10px',
                        fontWeight: '550',
                        userSelect: 'none',
                    }}
                >
                    {userDetail?.name}
                </div>
                <div className={cx('user-box')}>
                    <BellNotification />
                    <Dropdown
                        overlay={<Menu items={userDropdownItems} onClick={onClickUserAvatar} />}
                        placement="bottomRight"
                        trigger={['click']}
                        arrow={{ pointAtCenter: true }}
                    >
                        <Avatar size={42} src={UserAvatar} className="hover-pointer" />
                    </Dropdown>
                    <div className={cx('user-info')}>
                        <h6 className={cx('user-name')}>Welcome Quyen!</h6>
                        <h6 className={cx('user-position')}>To truong</h6>
                    </div>
                </div>
            </div>
        </Header>
    );
}
