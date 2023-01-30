import axios from 'axios';
import { REQUEST_STATE, TOKEN_KEY } from '~/app-configs';
import { PATCH, PUT } from '~/app-data/fetch';
import { DELETE } from '~/app-data/fetch';
import { POST } from '~/app-data/fetch';
import { GET } from '~/app-data/fetch';

export const apiLayTamVang = async (params) => {
    try {
        const response = await GET('/hokhau/don/all', params, { isFullPath: false });
        //    const token = localStorage.getItem(TOKEN_KEY);
        //    const response = await axios.get('http://localhost:3000/hokhau/don/all/?type=don_tam_vang', {
        //        headers: {
        //            Authorization: 'Bearer ' + token,
        //        },
        //    });
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
