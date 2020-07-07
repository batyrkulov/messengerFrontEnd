import React from "react";
import Contact from "./Contact/Contact";

const Left = ({contacts}) => {
    return <div>
        {contacts.map(contact=><Contact key={contact.id} user={contact} /> )}
    </div>
}

export default Left;