import {authAPI, usersAPI} from "../api/api";
import {setGerror} from "./app-reducer";
import {stopSubmit} from "redux-form";
import {selectMe} from "./selectors/me-selectors";

const base = 'themr/me/';

const SET_AUTH = base+'SET_AUTH';
const SET_ME = base+'SET_ME';

const initialState = {
    auth: false,
    me: {}
}

const meReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
        case SET_ME: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setAuth = auth => ({type: SET_AUTH, payload: {auth}});
export const setMe = me => ({type: SET_ME, payload: {me}});

export const createMe = data => async dispatch => {
    let me = await usersAPI.createUser(data);
    if (me) {
        let me = await authAPI.isAuth();
        if (me) {
            dispatch(setAuth(true));
            dispatch(setMe(me));
        } else  dispatch(setGerror('Getting auth user data server error'));
    } else   dispatch(setGerror('Registration server error'));
}

export const exitMe = () => async dispatch => {
    await authAPI.logout();
    dispatch(setAuth(false));
    dispatch(setMe({}));
}

export const authMe = (email, password) => async dispatch => {
    let response = await authAPI.auth(email, password);
    if (response) {
        let me = await authAPI.isAuth();
        if (me) {
            dispatch(setAuth(true));
            dispatch(setMe(me));
        } else  dispatch(setGerror('Getting auth user data server error'));
    } else  dispatch(stopSubmit('login', {_error: 'Incorrect email or password'}));
}

export const updateMe = (surname, status) => async (dispatch, getState) => {
    let response = await usersAPI.updateUser(surname, status);
    if (response) {
        dispatch(setMe({...selectMe(getState()), surname, status}));
    } else  dispatch(setGerror('Updating server error'));
}


export default meReducer;