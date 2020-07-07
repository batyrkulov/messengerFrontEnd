import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {required} from "../../../../utils/validators/validators";
import {Textarea} from "../Textarea";
import {compose} from "redux";
import {connect} from "react-redux";
import {sendMessage} from "../../../../redux/messages-reducer";

const MessageSender = ({to, onMessageSent, sendMessage}) => {
    const onSubmitForm = async data =>{
        let bool = await sendMessage(to, data.body);
        onMessageSent(bool);
    }

    const afterSubmit = (result, dispatch)=>dispatch(reset('sender'));

    const SenderForm = props => {

        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={`Text`} name={`body`} component={Textarea} validate={[required]}/>
            </div>
            <button disabled={props.submitting}>
                Send
            </button>
        </form>
    }

    const SenderReduxForm = reduxForm({
        form: 'sender',
        onSubmitSuccess: afterSubmit
    })(SenderForm);


    return <SenderReduxForm onSubmit={onSubmitForm} />

}

export default compose(
    connect(null, {sendMessage})
)(MessageSender);