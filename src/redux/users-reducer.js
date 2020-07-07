import {usersAPI} from "../api/api";
import {setGerror} from "./app-reducer";

const base = 'themr/users/';

const SET_USERS = base+'SET_USERS';
const SET_TOTAL_USERS = base+'SET_TOTAL_USERS';
const SET_PAGE_FOR_USERS = base+'SET_PAGE_FOR_USERS';

const initialState = {
    totalUsers: 0,
    pageForUsers: 1,
    users: []
}

const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, ...action.payload}
        }
        case SET_TOTAL_USERS: {
            return {...state, ...action.payload}
        }
        case SET_PAGE_FOR_USERS: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setUsers = users => ({type: SET_USERS, payload: {users}});
export const setTotalUsers = totalUsers => ({type: SET_TOTAL_USERS, payload: {totalUsers}});
export const setPageForUsers = pageForUsers => ({type: SET_PAGE_FOR_USERS, payload: {pageForUsers}});

export const isEmailFree = email => async dispatch => await usersAPI.isEmailFree(email);

export const getUsers = (page=1, pageSize=30) => async dispatch => {
    let response = await usersAPI.getUsers(page, pageSize);
    if (response.errorCode===0) {
        dispatch(setUsers(response.data.users));
        dispatch(setTotalUsers(response.data.totalUsers));
        dispatch(setPageForUsers(page));
    } else dispatch(setGerror('Reading users server error'));
}


export default usersReducer;