import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const featureModule = {
    key: 'feature',
    path: 'Feature',
};

export default {
    path: '/',
    exact: true,
    role: [USER_ROLE.ADMIN, USER_ROLE.USER],
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([featureModule], 'app');
        return import('./pages/Demo');
    }),
};

export const childRoutes = [];
