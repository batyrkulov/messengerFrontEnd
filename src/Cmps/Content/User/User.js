import React from "react";
import {compose} from "redux";
import withOnlyForAuthCheck from "../../../hoc/withOnlyForAuthCheck";
import {connect} from "react-redux";
import {getUser} from "../../../redux/user-reducer";
import {withRouter} from "react-router-dom";
import {selectUser} from "../../../redux/selectors/user-selectors";
import Preloader from "../../Common/Preloader/Preloader";


class User extends  React.Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.userId);
    }

    render() {
        let user = this.props.user;

        if (user)
            return <div>
                {user.name}
            </div>
        else  return <Preloader/>
    }
}

export default compose(
    withOnlyForAuthCheck,
    withRouter,
    connect(state=>({user: selectUser(state)}), {getUser})
)(User);