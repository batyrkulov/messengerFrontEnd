import {setGerror} from "./app-reducer";
import {usersAPI} from "../api/api";

const base = 'themr/user/';

const SET_USER = base+'SET_USER';

const initialState = {
    user: {}
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setUser = user => ({type: SET_USER, payload: {user}});

export const getUser = userId => async dispatch => {
    let response = await usersAPI.getUser(userId);
    if (response.errorCode===0) {
        dispatch(setUser(response.data));
    } else dispatch(setGerror('Reading user server error'));
}

export default userReducer;