import { SEND_SEARCH } from './types';

export const sendSearch = ( search) => {
    return (dispatch) => {
        dispatch({
            type: SEND_SEARCH,
            payload:search,
        })
    }
};

