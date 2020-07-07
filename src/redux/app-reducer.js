const base = 'themr/app/';

const SET_G_ERR = base+'SET_G_ERR';

let initialState = {
    appGlobalError: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_G_ERR: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setGerror = appGlobalError => ({type: SET_G_ERR, payload: {appGlobalError}});


export default appReducer;