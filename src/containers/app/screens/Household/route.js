import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';
import { residentModule } from '../Resident/route';

export const householdModule = {
    key: 'household',
    path: 'Household',
};

export default {
    path: '/household/create',
    exact: true,
    isPrivate: true,
    role: [USER_ROLE.ADMIN, USER_ROLE.USER],
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([householdModule, residentModule], 'app');
        return import('./pages/AddHousehold');
    }),
};

export const childRoutes = [
    {
        path: '/household/list',
        key: 'list',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule], 'app');
            return import('./pages/HouseholdList');
        }),
    },
    {
        path: '/household/move',
        key: 'move',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdMove');
        }),
    },
    {
        path: '/household/separate',
        key: 'separate',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdSeparate');
        }),
    },
    {
        path: '/household/detail/:id',
        key: 'detail',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdDetail');
        }),
    },
    {
        path: '/household/add-resident/:id',
        key: 'add-resident',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdAddResident');
        }),
    },
    {
        path: '/household/add-resident/',
        key: 'add-resident',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdAddResident');
        }),
    },
    {
        path: '/household/history/:id',
        key: 'history',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdHistory');
        }),
    },
];
