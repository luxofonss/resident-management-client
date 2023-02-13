import { lazy } from 'react';
import { USER_ROLE } from '~/app-configs';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';
import { residentModule } from '../Resident/route';

export const temporaryAbsentModule = {
    key: 'temporaryAbsent',
    path: 'TemporaryAbsent',
};

export default {
    path: '/temporary-absent/new-temporary',
    exact: true,
    role: [USER_ROLE.ADMIN, USER_ROLE.USER],
    isPrivate: true,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([temporaryAbsentModule], 'app');
        return import('./pages/TemporaryAdd');
    }),
};

export const childRoutes = [
    {
        path: '/temporary-absent/new-absent',
        key: 'absent',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([temporaryAbsentModule, residentModule], 'app');
            return import('./pages/AbsentAdd');
        }),
    },
    {
        path: '/temporary-absent/absent-list',
        key: 'absent-list',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([temporaryAbsentModule, residentModule], 'app');
            return import('./pages/AbsentList');
        }),
    },
    {
        path: '/temporary-absent/temporary-list',
        key: 'temporary-list',
        exact: true,
        role: [USER_ROLE.ADMIN, USER_ROLE.USER],
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([temporaryAbsentModule, residentModule], 'app');
            return import('./pages/TemporaryList');
        }),
    },
];
