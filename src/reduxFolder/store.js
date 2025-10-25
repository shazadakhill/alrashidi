import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// const initialState = {};
const middleware = [thunk];

function saveToSessionStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        sessionStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}
function loadFromSessionStorage() {
    try {
        const serialisedState = sessionStorage.getItem("persistantState");
        if(serialisedState===null)return undefined;
        return JSON.parse(serialisedState);

    } catch (e) {
        console.warn(e);
        return undefined;
    }
}
const store = createStore(
    rootReducer,
    loadFromSessionStorage(),
    composeWithDevTools(applyMiddleware(...middleware))
)
store.subscribe(()=>saveToSessionStorage(store.getState()))

export default store;