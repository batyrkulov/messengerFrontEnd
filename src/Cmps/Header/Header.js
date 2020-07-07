import React from "react";
import style from './Header.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import {exitMe} from "../../redux/me-reducer";
import {selectAuth, selectMe} from "../../redux/selectors/me-selectors";
import {NavLink} from "react-router-dom";
import {selectAppGerr} from "../../redux/selectors/app-selectors";
import {setGerror} from "../../redux/app-reducer";

const Header = ({auth, me, exitMe, gErr, clearGerr})=>{
    return <nav className={style.header}>
        {!auth
            ? <NavLink to={`/login`}>Login</NavLink>
            : <> {me.name}  <button onClick={()=>{exitMe()}}>Exit</button>  </>
        }

        {gErr &&
            <div>
                {gErr}
                {clearGerr()}
            </div>
        }
    </nav>
}

const mapStateToProps = state => ({
    auth: selectAuth(state),
    me: selectMe(state),
    gErr: selectAppGerr(state)
});

const mapDispatchToProps = dispatch=> (
    {exitMe: ()=> {
        dispatch(exitMe());
    },
    clearGerr: ()=>{
        setTimeout(()=>{dispatch(setGerror(false))},3500)}
    }
);

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Header);