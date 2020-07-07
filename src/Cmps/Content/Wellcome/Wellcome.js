import React from "react";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import withOnlyForNoAuthCheck from "../../../hoc/withOnlyForNoAuthCheck";

const Wellcome = props => {
    return <div>
        The messenger <br/><NavLink to='/login'>Login</NavLink><br/><NavLink to='/register'>Register</NavLink>
    </div>
}

export default compose(
    withOnlyForNoAuthCheck
)(Wellcome);