import usersReducer, {addMessageAC} from "./dialogs-reducer";


test('messages length must be 3', ()=>{
    // start data
    let state = {
        messages: [
            {id: 1, text: "Hi"},
            {id: 2, text: "Yo"}
        ]
    }
    let action =  addMessageAC('some text');


    // running
    let newState = usersReducer(state, action);

    // expecting
    expect(newState.messages.length).toBe(3);
});