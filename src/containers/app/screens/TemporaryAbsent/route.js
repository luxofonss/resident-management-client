import { lazy } from 'react';
import AppLayout from '~/components/Layout/AppLayout';
import { initModules } from '~/router/index';

export const temporaryAbsentModule = {
    key: 'temporaryAbsent',
    path: 'TemporaryAbsent',
};

export default {
    path: '/',
    exact: true,
    isPrivate: false,
    layout: AppLayout,
    component: lazy(async () => {
        await initModules([temporaryAbsentModule], 'app');
        return import('./pages/Demo');
    }),
};

export const childRoutes = [
    {
        path: '/temporary-absent/new-temporary',
        key: 'death',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([temporaryAbsentModule], 'app');
            return import('./pages/TemporaryAdd');
        }),
    },
    {
        path: '/temporary-absent/new-absent',
        key: 'death',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([temporaryAbsentModule], 'app');
            return import('./pages/AbsentAdd');
        }),
    },
    {
        path: '/temporary-absent/absent-list',
        key: 'absent-list',
        exact: true,
        isPrivate: true,
        layout: AppLayout,
        component: lazy(async () => {
            await initModules([temporaryAbsentModule], 'app');
            return import('./pages/AbsentList');
        }),
    },
];
