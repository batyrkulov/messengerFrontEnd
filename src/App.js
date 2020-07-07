import React, {useEffect} from 'react';
import style from './App.module.css'
import Header from "./Cmps/Header/Header";
import Content from "./Cmps/Content/Content";
import Footer from "./Cmps/Footer/Footer";
import Preloader from "./Cmps/Common/Preloader/Preloader";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {selectReady} from "./redux/selectors/init-selectors";
import {initApp} from "./redux/init-reducer";

const App = ({ready, initApp})=> {
    useEffect(()=>{
        if (!ready)
            initApp();
    }, [ready]);

    if (ready) {
        return <div className={style.main}>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    } else
        return <Preloader/>
}

const mapStateToProps = state=>({
    ready: selectReady(state)
});

export default compose(
    connect(mapStateToProps, {initApp})
)(App);
