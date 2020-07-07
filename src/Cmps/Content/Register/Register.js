import React, {useState} from "react";
import {compose} from "redux";
import withOnlyForNoAuthCheck from "../../../hoc/withOnlyForNoAuthCheck";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Common/Form/Input";
import {maxLenCreator, password, passwordConfirm, required, validEmail} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import {isEmailFree} from "../../../redux/users-reducer";
import {createMe} from "../../../redux/me-reducer";

const maxLen100 = maxLenCreator(100);

const Register = props => {

    const onSubmitForm = data =>{
        props.createMe(data);
    }

    const asyncValidate = async values => {
        if (!await props.isEmailFree(values.email))
            throw {email: 'The email is alredy taken!'};
    }

    const RegisterForm = props => {

        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={`Name`} name={`name`} component={Input} validate={[required,maxLen100]}/>
            </div>
            <div>
                <Field placeholder={`Surname`} name={`surname`} component={Input} validate={[required,maxLen100]}/>
            </div>
            <div>
                <Field placeholder={`Email`} name={`email`} component={Input} validate={[required,validEmail]}/>
            </div>
            <div>
                <Field type={`password`} placeholder={`Password`} name={`password`} component={Input} validate={[required, password]}/>
            </div>
            <div>
                <Field  type={`password`}  placeholder={`Confirm password`} name={`passwordConfirm`} component={Input} validate={[required, password, passwordConfirm]}/>
            </div>
            <button disabled={props.submitting}>
                Register
            </button>
        </form>
    }

    const RegisterReduxForm = reduxForm({
        form: 'register',
        asyncValidate,
        asyncBlurFields: ['email']
    })(RegisterForm);


    return <RegisterReduxForm onSubmit={onSubmitForm} />
}



export default compose(
    withOnlyForNoAuthCheck,
    connect(null, {isEmailFree, createMe})
)(Register);