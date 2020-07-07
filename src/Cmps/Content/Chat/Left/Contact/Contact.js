import React from "react";
import {NavLink} from "react-router-dom";

const Contact = ({user}) => {
    return <div>
        <NavLink to={`/chat/${user.id}`}>{user.name}</NavLink>
    </div>
}

export default Contact;