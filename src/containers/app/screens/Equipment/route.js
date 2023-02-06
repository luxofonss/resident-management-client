import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const equipmentModule = {
    key: 'equipment',
    path: 'Equipment',
};

export default {
    path: '/',
    exact: true,
    isPrivate: false,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([equipmentModule], 'app');
        return import('./pages/Demo');
    }),
};

export const childRoutes = [
    {
        path: '/equipment/add',
        key: 'add',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentAdd');
        }),
    },
    {
        path: '/equipment/type/add',
        key: 'add-type',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentAddType');
        }),
    },
    {
        path: '/equipment/type',
        key: 'list-type',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentTypeList');
        }),
    },
];
