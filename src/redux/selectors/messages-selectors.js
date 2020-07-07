export const selectMessages = state=>state.messagesReducer.messages;
export const selectTotalMessagesForUser = state=>state.messagesReducer.totalMessagesForUser;
export const selectScrollFinished = state=>state.messagesReducer.scrollFinished;