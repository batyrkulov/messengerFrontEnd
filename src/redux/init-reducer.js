import {authAPI} from "../api/api";
import {setAuth, setMe} from "./me-reducer";

const base = 'themr/init/';

const SET_READY = base+'SET_READY';

let initialState = {
    ready: false
}

const initReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_READY: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setReady = ready => ({type: SET_READY, payload: {ready}});

export const initApp = () => async dispatch=> {
     let me =  await authAPI.isAuth();
     if (me) {
         dispatch(setAuth(true));
         dispatch(setMe(me));
     }
    dispatch(setReady(true));
}

export default initReducer;