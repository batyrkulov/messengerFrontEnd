import React from "react";
import {compose} from "redux";
import withOnlyForAuthCheck from "../../../hoc/withOnlyForAuthCheck";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/users-reducer";
import {selectPageForUsers, selectTotalUsers, selectUsers} from "../../../redux/selectors/users-selectors";
import UserInList from "./UserInList/UserInList";
import MessageSender from "../../Common/Form/MessageSender/MessageSender";
import style from './List.module.css'
import {Paginator} from "../../Common/Paginator/Paginator";
import Preloader from "../../Common/Preloader/Preloader";

class List extends React.Component {
    state = {
        showInput: false
    }

    componentDidMount() {
        this.props.getUsers(this.props.pageForUsers);
    }


    render() {
        if (this.props.totalUsers===0) return <Preloader/>
        return <div>
            {this.props.users.map(user=><UserInList key={user.id} user={user} inputForUser={this.inputForUser} inputShowed={this.state.showInput}/>)}
            { this.state.showInput && <div className={style.messageSenderBlock}>
                <MessageSender to={this.state.showInput.userId} onMessageSent={this.onMessageSent}/>
            </div>}
            <Paginator
                totalItemsCount ={this.props.totalUsers}
                pageSize  ={20}
                currentPage  ={this.props.pageForUsers}
                onPageChanged = {this.props.getUsers}
            />
        </div>
    }

    inputForUser = (userId, showInput)=> {
        this.setState({showInput: showInput ? {userId, showInput} : false});
    }

    onMessageSent = bool => {
        this.setState({showInput: false});
    }

}

const mapStateToProps = state=> ({
    users: selectUsers(state),
    totalUsers: selectTotalUsers(state),
    pageForUsers: selectPageForUsers(state),
});

export default compose(
    withOnlyForAuthCheck,
    connect(mapStateToProps, {getUsers})
)(List);
