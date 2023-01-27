import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const residentModule = {
    key: 'resident',
    path: 'Resident',
};

export default {
    path: '/',
    exact: true,
    isPrivate: false,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([residentModule], 'app');
        return import('./pages/ResidentList');
    }),
};

export const childRoutes = [
    {
        path: '/resident/list',
        key: 'list',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule], 'app');
            return import('./pages/ResidentList');
        }),
    },
];
