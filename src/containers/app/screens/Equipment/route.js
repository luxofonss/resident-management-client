import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const equipmentModule = {
    key: 'equipment',
    path: 'Equipment',
};

export default {
    path: '/equipment/add',
    exact: true,
    role: [USER_ROLE.ADMIN, USER_ROLE.USER],
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([equipmentModule], 'app');
        return import('./pages/EquipmentAdd');
    }),
};

export const childRoutes = [
    {
        path: '/equipment/type/add',
        key: 'add-type',
        exact: true,
        role: [USER_ROLE.ADMIN],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentAddType');
        }),
    },
    {
        path: '/equipment/type/id',
        key: 'detail-type',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentTypeDetail');
        }),
    },
    {
        path: '/equipment/type',
        key: 'list-type',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentTypeList');
        }),
    },
    {
        path: '/equipment/borrow/:id',
        key: 'borrow',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentBorrow');
        }),
    },
    {
        path: '/equipment/borrow-list',
        key: 'borrow-list',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentBorrowList');
        }),
    },
    {
        path: '/equipment/borrow/detail/:id',
        key: 'borrow-detail',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentBorrowDetail');
        }),
    },
    {
        path: '/equipment/back/:id',
        key: 'back',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentBack');
        }),
    },
    {
        path: '/equipment/able-list',
        key: 'able',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentAbleList');
        }),
    },
    {
        path: '/equipment/history/:id',
        key: 'history',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([equipmentModule], 'app');
            return import('./pages/EquipmentHistory');
        }),
    },
];
