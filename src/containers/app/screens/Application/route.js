import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';
import { householdModule } from '../Household/route';
import { residentModule } from '../Resident/route';

export const applicationModule = {
    key: 'application',
    path: 'Application',
};

export default {
    path: '/application/household/movement',
    exact: true,
    role: [USER_ROLE.ADMIN, USER_ROLE.USER],
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([applicationModule, residentModule], 'app');
        return import('./pages/HouseholdMove');
    }),
};

export const childRoutes = [
    {
        path: '/application/household/separate',
        key: 'separate',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule], 'app');
            return import('./pages/HouseholdSeparate');
        }),
    },
    {
        path: '/application/household/add-resident',
        key: 'add-resident',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule], 'app');
            return import('./pages/HouseholdAddResident');
        }),
    },
    {
        path: '/application/household/update',
        key: 'update',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule, householdModule], 'app');
            return import('./pages/HouseholdUpdate');
        }),
    },
    {
        path: '/application/household/update/detail/:id',
        key: 'update-detail',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, householdModule], 'app');
            return import('./pages/HouseholdUpdateDetail');
        }),
    },
    {
        path: '/application/resident/update/detail/:id',
        key: 'update-detail',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, householdModule, residentModule], 'app');
            return import('./pages/ResidentUpdateDetail');
        }),
    },
    {
        path: '/application/resident/new-child',
        key: 'new-child',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule], 'app');
            return import('./pages/ResidentAddChild');
        }),
    },
    {
        path: '/application/resident/death',
        key: 'death',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],

        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule], 'app');
            return import('./pages/ResidentDeath');
        }),
    },
    {
        path: '/application/resident/update',
        key: 'resident-update',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule], 'app');
            return import('./pages/ResidentUpdate');
        }),
    },
];
