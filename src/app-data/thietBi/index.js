import axios from 'axios';
import { REQUEST_STATE, TOKEN_KEY } from '~/app-configs';
import { PATCH, PUT } from '~/app-data/fetch';
import { DELETE } from '~/app-data/fetch';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';

export const apiLayLoaiTB = async (params) => {
    try {
        const response = await GET('/tai-nguyen/type', params, { isFullPath: false });
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

export const apiTaoTaiNguyen = async (params) => {
    try {
        const response = await POST('/tai-nguyen', params, { isFullPath: false });
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

export const apiTaoLoaiTaiNguyen = async (params) => {
    try {
        const response = await POST('/tai-nguyen/type', params, { isFullPath: false });
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

export const apiMuonThietBi = async (params) => {
    try {
        const response = await POST('/tai-nguyen/muon', params, { isFullPath: false });
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

export const apiTraThietBi = async (params) => {
    try {
        const response = await POST('/tai-nguyen/tra', params, { isFullPath: false });
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

export const apiLayPhieuMuon = async (params) => {
    try {
        const response = await GET('/tai-nguyen/muon', params, { isFullPath: false });
        console.log('oresponseject', response);
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

export const apiLayTaiNguyen = async (params) => {
    try {
        const response = await GET('/tai-nguyen', params, { isFullPath: false });
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
