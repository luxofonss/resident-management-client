import { lazy } from 'react';
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
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule, residentModule], 'app');
            return import('./pages/HouseholdAddResident');
        }),
    },
];
