import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const adminModule = {
    key: 'admin',
    path: 'Admin',
};

export default {
    path: '/user-manager',
    exact: true,
    role: [USER_ROLE.ADMIN],
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([adminModule], 'app');
        return import('./pages/Admin');
    }),
};

export const childRoutes = [];
