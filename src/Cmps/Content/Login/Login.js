import React from "react";
import {compose} from "redux";
import withOnlyForNoAuthCheck from "../../../hoc/withOnlyForNoAuthCheck";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Common/Form/Input";
import {password,  required, validEmail} from "../../../utils/validators/validators";
import {connect} from "react-redux";
import {authMe} from "../../../redux/me-reducer";

const Login = props => {

    const LoginForm = props => {

        return <form onSubmit={props.handleSubmit}>
            {props.error &&
                <div>
                    {props.error}
                </div>
            }
            <div>
                <Field placeholder={`Email`} name={`email`} component={Input} validate={[required,validEmail]}/>
            </div>
            <div>
                <Field type={`password`} placeholder={`Password`} name={`password`} component={Input} validate={[required, password]}/>
            </div>
            <button disabled={props.submitting}>
                Login
            </button>
        </form>
    }

    const LoginReduxForm = reduxForm({
        form: 'login'
    })(LoginForm);


    return <LoginReduxForm onSubmit={data=>{props.authMe(data.email, data.password)}} />
}

export default compose(
    withOnlyForNoAuthCheck,
    connect(null, {authMe})
)(Login);