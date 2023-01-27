import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const householdModule = {
    key: 'household',
    path: 'Household',
};

export default {
    path: '/household/sample',
    exact: true,
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([householdModule], 'app');
        return import('./pages/AddHousehold');
    }),
};

export const childRoutes = [
    {
        path: '/household/create',
        key: 'create',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([householdModule], 'app');
            return import('./pages/AddHousehold');
        }),
    },
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
            await initModules([householdModule], 'app');
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
            await initModules([householdModule], 'app');
            return import('./pages/HouseholdSeparate');
        }),
    },
];
