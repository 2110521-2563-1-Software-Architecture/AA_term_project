import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import UserProfile from "../components/UserProfile"
import EditUserProfile from "../components/EditUserProfile"

const MainWrapper = styled.div`

    display: flex;
    justify-content: center;

`

const UserPage = () => {

    const history = useHistory()
    const [isEdit, setIsEdit] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [forceRender, setForceRender] = useState(false)

    useEffect(() => {

        if (!localStorage.getItem('token')) {
            history.push('/')
        }

        const getUserInfo = async () => {

            const JwtToken = `JWT ${localStorage.getItem('token')}`
            let { data: { user: { email, name } } } = await Axios.get("http://aa-shortener.poomrokc.services/api/user/whoami", { headers: { Authorization: JwtToken } })

            if (!name) {name = "Anonymous"}
            
            setUserInfo({email, name})

        }

        getUserInfo()
    }, [forceRender])

    return (
        <MainWrapper>
            {
                isEdit ?  
                    <EditUserProfile onSet={setIsEdit} reRender={setForceRender} /> 
                    : 
                    <UserProfile onSet={setIsEdit} data={userInfo} reRender={forceRender} />
            }
        </MainWrapper>
    )
}

export default UserPage