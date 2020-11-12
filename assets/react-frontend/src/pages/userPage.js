import React, { useState } from 'react'

import UserProfile from "../components/UserProfile"
import EditUserProfile from "../components/EditUserProfile"

const UserPage = () => {

    const [isEdit, setIsEdit] = useState(false)
    const handle = () => {
        setIsEdit(prevState => !prevState)
    }

    return (
        <div>
            <h1>User</h1>
            <button onClick={handle}>Click</button>
            {
                isEdit ?  <EditUserProfile /> : <UserProfile />
            }
        </div>
    )
}

export default UserPage