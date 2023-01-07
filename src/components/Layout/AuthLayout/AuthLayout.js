import React, { Suspense } from 'react';
import styles from './AuthLayout.module.sass';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <>
            <div className={cx('auth-layout')}>{children}</div>
        </>
    );
}

export default AuthLayout;
