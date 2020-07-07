import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as form} from 'redux-form';
import initReducer from "./init-reducer";
import meReducer from "./me-reducer";
import usersReducer from "./users-reducer";
import appReducer from "./app-reducer";
import messagesReducer from "./messages-reducer";
import contactsReducer from "./contacts-reducer";
import userReducer from "./user-reducer";
import additionReducer from "./addition-reducer";

let reducers = combineReducers({
    form,
    initReducer,
    meReducer,
    usersReducer,
    appReducer,
    messagesReducer,
    contactsReducer,
    userReducer,
    additionReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;