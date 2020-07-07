import React from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {selectAuth} from "../redux/selectors/me-selectors";

let withOnlyForAuthCheck = Component=> {
    let Cmp = props => {
        if (!props.auth)
            return <Redirect to={`/login`} />
        else
            return <Component {...props}/>
    }

    let mapStateToProps = state => ({
        auth: selectAuth(state)
    });

    return connect(mapStateToProps)(Cmp);
}

export default withOnlyForAuthCheck;