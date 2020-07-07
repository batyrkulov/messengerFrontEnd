import React from "react";
import {compose} from "redux";
import withOnlyForAuthCheck from "../../../hoc/withOnlyForAuthCheck";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../Common/Form/Textarea";
import {required} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import {selectMe} from "../../../redux/selectors/me-selectors";
import {updateMe} from "../../../redux/me-reducer";

const Settings = props => {

    const UpdateDataForm = props => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={`Status`} name={`status`} component={Textarea} validate={[required]}/>
            </div>
            <button disabled={props.submitting}>
                Save
            </button>
        </form>
    }


    const UpdateDataReduxForm = reduxForm({
        form: 'updateData'
    })(UpdateDataForm);

    return <div>
        {props.me.name}
        <br/>
        {props.me.surname}
        <br/>
        {props.me.status}
        <UpdateDataReduxForm onSubmit={data=>{props.updateMe(props.me.surname, data.status)}}/>
    </div>
}

export default compose(
    withOnlyForAuthCheck,
    connect(state=>({me: selectMe(state)}), {updateMe})
)(Settings);