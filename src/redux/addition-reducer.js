const base = 'themr/addition/';

const SET_ISLOADING = base+'SET_ISLOADING';
const SET_PAGE = base+'SET_PAGE';

const initialState = {
    infiniteScroll: {
        isLoading: false,
        page: 1,
    }
}

const additionReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_ISLOADING:
        case SET_PAGE: {
            return {...state, infiniteScroll: {...state.infiniteScroll, ...action.payload}}
        }
        default:
            return state;
    }
}

export const setIsLoading = isLoading => ({type: SET_ISLOADING, payload: {isLoading}});
export const setPage = page => ({type: SET_PAGE, payload: {page}});


export default additionReducer;