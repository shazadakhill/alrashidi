import { GET_SEARCH } from './types';

export const getSearch=()=>{
    return (dispatch) => {dispatch({type: GET_SEARCH})
    }
}
