import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import AppHeader from '~/components/Layout/components/Header';
import AppSider from '../components/Sider/Sider';
import styles from './AppLayout.module.sass';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const { Sider, Content } = Layout;

export function getNavItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function AppLayout({ children, match }) {
    return (
        <Layout>
            <AppSider />
            <Layout>
                <AppHeader />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        position: 'relative',
                    }}
                >
                    <div className={cx('content-wrapper')}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AppLayout;
