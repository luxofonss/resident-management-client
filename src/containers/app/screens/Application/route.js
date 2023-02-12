import { lazy } from 'react';
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
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule, householdModule], 'app');
            return import('./pages/HouseholdUpdateDetail');
        }),
    },
    {
        path: '/application/resident/new-child',
        key: 'new-child',
        exact: true,
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
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([applicationModule, residentModule], 'app');
            return import('./pages/ResidentDeath');
        }),
    },
];
