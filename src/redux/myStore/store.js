import accountReducer from "./account-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        accountPage: {
            posts: [
                {id: 1, text: "first post", likesCount: 45},
                {id: 2, text: "second post", likesCount: 21},
            ],
            newPostText: ''
        },
        dialogsPage: {
            persons: [
                {id: 1, name: "John"},
                {id: 2, name: "Don"}
            ],
                messages: [
                {id: 1, text: "Hi"},
                {id: 2, text: "Yo"}
            ],
            newMessageText: ''
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {return this._state},
    subscribe(observer) {this._callSubscriber = observer;},

    dispatch(action) {
        this._state.accountPage = accountReducer(this._state.accountPage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    }

}


export default store;