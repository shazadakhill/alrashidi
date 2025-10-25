import { SEND_SEARCH, GET_SEARCH } from "../action/types";


const initialState = {
    searchText: ""
}

const searchReducer = (state = initialState, action) => {


    switch (action.type) {

        case SEND_SEARCH:
            return {
                ...state,
                searchText: action.payload

            }
        case GET_SEARCH:
            return {
                ...state
            }
    
        default:
            return state;
    }
}
export default searchReducer;