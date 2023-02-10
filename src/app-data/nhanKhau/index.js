import { REQUEST_STATE } from '~/app-configs';
import { PATCH, PUT } from '~/app-data/fetch';
import { DELETE } from '~/app-data/fetch';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';
import { Configs } from '~/app-configs';

export const apiThemNK = async (params) => {
    try {
        const response = await POST('/nhankhau', params, { isFullPath: false });
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

export const apiLayNK = async (params) => {
    try {
        const response = await GET('/nhankhau', params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data,
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

export const apiKhaiSinhNK = async (params) => {
    try {
        const response = await POST('/nhankhau', { ...params, limit: Configs.PAGE_SIZE_20 }, { isFullPath: false });
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

export const apiCapNhatNK = async (params) => {
    try {
        const response = await PATCH('/nhankhau/dinh-chinh', { ...params }, { isFullPath: false });
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

export const apiKhaiTuNK = async (params) => {
    try {
        const response = await DELETE(`/nhankhau/${params.id}`, params.data, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data,
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
