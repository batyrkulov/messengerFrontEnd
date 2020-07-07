import {messagesAPI} from "../api/api";
import {setGerror} from "./app-reducer";

const base = 'themr/messages/';

const ADD_MESSAGES = base+'ADD_MESSAGES';
const SET_TOTAL = base+'SET_TOTAL';
const SET_SCROLL_FINISH = base+'SET_SCROLL_FINISH';

const initialState = {
    messages: [],
    totalMessagesForUser: 0,
    scrollFinished: false
}

const messagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGES: {
            return {...state,  messages: [...state.messages, ...action.messages]}
        }
        case SET_TOTAL:
        case SET_SCROLL_FINISH:  {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const addMessages = messages=> ({type: ADD_MESSAGES, messages});
export const setTotal = totalMessagesForUser=> ({type: ADD_MESSAGES, totalMessagesForUser});
export const setScrollFinished = scrollFinished=> ({type: SET_SCROLL_FINISH, scrollFinished});


export const sendMessage = (to, body) => async dispatch => {
    let response = await messagesAPI.sendMessage(to, body);
    return response.errorCode===0;
}

export const getMessages = (userId, page=1, pageSize=20) => async dispatch => {
    const response = await messagesAPI.getMessages(userId ,page, pageSize);
    if (response.errorCode===0) {
        if (response.data.messages.length>0) {
            dispatch(addMessages(response.data.messages));
            debugger
            dispatch(setTotal(response.data.totalMessages))
        } else
            dispatch(setScrollFinished(true));
    } else
        dispatch(setGerror('Get messages server error'));
}


export default messagesReducer;