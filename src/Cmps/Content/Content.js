import React, {Suspense} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import Preloader from "../Common/Preloader/Preloader";
import RegisterContainer from './Register/Register';
import LoginContainer from './Login/Login';
import ChatContainer from './Chat/Chat';
import ListContainer from './List/List';
import style from './Content.module.css'
import Wellcome from "./Wellcome/Wellcome";
import {compose} from 'redux';
import {connect} from "react-redux";
import {selectAuth} from "../../redux/selectors/me-selectors";

const UserContainer = React.lazy(()=>import('./User/User'));
const SettingsContainer = React.lazy(()=>import('./Settings/Settings'));

const Content = ({auth}) => {
    return <div className={style.content}>
        <Suspense fallback={<Preloader/>}>
            <Switch>
                <Route path='/chat/:userId?' render={()=><ChatContainer/>}/>
                <Route path='/list' render={()=><ListContainer/>}/>
                <Route path='/register' render={()=><RegisterContainer/>}/>
                <Route path='/login' render={()=><LoginContainer/>}/>
                <Route path='/user/:userId' render={()=><UserContainer/>}/>
                <Route path='/settings' render={()=><SettingsContainer/>}/>
                <Route path='/wellcome' render={()=><Wellcome/>}/>
                <Route path='*' render={()=> auth ? <Redirect to={`/chat`}/> : <Redirect to={`/wellcome`}/>}/>
            </Switch>
        </Suspense>
    </div>
}

const mapStateToProps = state=>({
    auth: selectAuth(state)
});

export default compose(
    connect(mapStateToProps)
)(Content);