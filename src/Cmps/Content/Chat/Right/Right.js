import React from "react";
import Message from "./Message/Message";
import MessageSender from "../../../Common/Form/MessageSender/MessageSender";
import InfiniteScroll from "../../../Common/InfiniteScroll/InfiniteScroll";

const Right = ({messages, to, onMessageSent, totalMessages, dataLoader, scrollFinished}) => {
    return <div>
        right
        {messages.map(message=><Message key={message.id} message={message} /> )}
        {messages.length && <MessageSender to={to} onMessageSent={onMessageSent}/>}
        <InfiniteScroll
            dataLoader={dataLoader}
            totalCount={totalMessages}
            currentCount={messages.length}
            pageSize ={10}
            scrollFinished={scrollFinished}
        />
    </div>
}

export default Right;