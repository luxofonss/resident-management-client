import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';
import { householdModule } from '../Household/route';

export const residentModule = {
    key: 'resident',
    path: 'Resident',
};

export default {
    path: '/resident/list',
    exact: true,
    role: [USER_ROLE.ADMIN, USER_ROLE.USER],
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([residentModule], 'app');
        return import('./pages/ResidentList');
    }),
};

export const childRoutes = [
    {
        path: '/resident/create',
        key: 'add',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule], 'app');
            return import('./pages/ResidentAdd');
        }),
    },
    {
        path: '/resident/create-child',
        key: 'add',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule], 'app');
            return import('./pages/ResidentAddChild');
        }),
    },
    {
        path: '/resident/edit/:id',
        key: 'edit',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule], 'app');
            return import('./pages/ResidentEdit');
        }),
    },
    {
        path: '/resident/delete/:id',
        key: 'edit',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule, householdModule], 'app');
            return import('./pages/ResidentDelete');
        }),
    },
    {
        path: '/resident/death/:id',
        key: 'death',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule], 'app');
            return import('./pages/ResidentDeath');
        }),
    },
    {
        path: '/resident/history/:id',
        key: 'history',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([residentModule], 'app');
            return import('./pages/ResidentHistory');
        }),
    },
];
