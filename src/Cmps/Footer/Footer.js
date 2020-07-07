import React from "react";
import style from "./Footer.module.css";
import {NavLink} from "react-router-dom";

const Footer = props => {
    return <div className={style.footer}>
        <NavLink to={`/settings`}>settings</NavLink><br/>
        <NavLink to={`/chat`}>chat</NavLink><br/>
        <NavLink to={`/list`}>list</NavLink><br/>
        <NavLink to={`/user/1`}>user/1</NavLink><br/><br/>
        <NavLink to={`/register`}>register</NavLink><br/>
        <NavLink to={`/login`}>login</NavLink><br/>
        <NavLink to={`/wellcome`}>wellcome</NavLink>
    </div>
}

export default  Footer;