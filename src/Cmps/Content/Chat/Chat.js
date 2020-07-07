import React from "react";
import Left from "./Left/Left";
import Right from "./Right/Right";
import {compose} from 'redux';
import withOnlyForAuthCheck from "../../../hoc/withOnlyForAuthCheck";
import {connect} from "react-redux";
import {selectContacts} from "../../../redux/selectors/contacts-selectors";
import {getContacts} from "../../../redux/contacts-reducer";
import {getMessages} from "../../../redux/messages-reducer";
import {
    selectMessages,
    selectScrollFinished,
    selectTotalMessagesForUser
} from "../../../redux/selectors/messages-selectors";
import {withRouter} from "react-router-dom";

class Chat extends  React.Component {

    componentDidMount() {
        this.props.getContacts();
        this.getMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getMessages();
        }
    }

    render() {
        return <div>
            <Left contacts={this.props.contacts}/>
            <Right onMessageSent={this.onMessageSent}
                   to={this.props.match.params.userId}
                   messages={this.props.messages}
                   totalMessages={this.props.totalMessages}
                   dataLoader={this.getMessages}
                   scrollFinished={this.props.scrollFinished}
            />
        </div>
    }

    getMessages = (page=1, pageSize=10)=> {
        if (this.props.match.params.userId) {
            this.props.getMessages(this.props.match.params.userId, page, pageSize);
        }
    }

    onMessageSent = () => {

    }
}

const  mapStateToProps = state => ({
    contacts: selectContacts(state),
    messages: selectMessages(state),
    totalMessages: selectTotalMessagesForUser(state),
    scrollFinished: selectScrollFinished(state)
});

export default compose(
    withOnlyForAuthCheck,
    withRouter,
    connect(mapStateToProps, {getContacts, getMessages})
)(Chat);