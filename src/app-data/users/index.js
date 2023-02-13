import { REQUEST_STATE } from '~/app-configs';
import { PATCH, PUT } from '~/app-data/fetch';
import { DELETE } from '~/app-data/fetch';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';

export const apiLayUser = async (params) => {
    try {
        const response = await GET('/user/all', params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error,
            state: REQUEST_STATE.ERROR,
            data: {},
        };
    }
};

export const apiDuyetUser = async (params) => {
    try {
        const response = await PATCH(`/user/accept/${params.id}`, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error,
            state: REQUEST_STATE.ERROR,
            data: {},
        };
    }
};

export const apiTaoUser = async (params) => {
    try {
        const response = await POST(`/user/new`, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error,
            state: REQUEST_STATE.ERROR,
            data: {},
        };
    }
};
