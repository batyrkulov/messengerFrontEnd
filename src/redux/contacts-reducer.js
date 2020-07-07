import {contactsAPI} from "../api/api";
import {setGerror} from "./app-reducer";

const base = 'themr/contacts/';

const SET_CONTACTS = base+'SET_CONTACTS';

let initialState = {
    contacts: []
}

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setContacts = contacts => ({type: SET_CONTACTS, payload: {contacts}});

export const getContacts = (page=1, pageSize=30) => async dispatch => {
    const response = await contactsAPI.getContacts(page, pageSize);
    if (response.errorCode===0) {
        dispatch(setContacts(response.data.users));
    } else dispatch(setGerror('Get contacts server error'));
}


export default contactsReducer;