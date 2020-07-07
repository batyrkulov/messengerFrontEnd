import React, {useEffect, useState} from "react";

const UserInList = ({user, inputForUser, inputShowed}) => {
    const [sendOn, setSendOn] = useState(false);

    useEffect(()=> {
        if (!inputShowed) setSendOn(false);
    }, [inputShowed]);

    const onBtnClick = ()=> {
        setSendOn(!sendOn);
        inputForUser(user.id, !sendOn);
    }

    return <div>
        {user.name}
        <div>
            <button onClick={onBtnClick}>{sendOn ? 'Cancel' : 'Send message'}</button>
        </div>
    </div>
}

export default UserInList;