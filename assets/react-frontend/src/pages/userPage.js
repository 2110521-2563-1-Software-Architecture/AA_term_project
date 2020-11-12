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
    }, [])

    const [isEdit, setIsEdit] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    return (
        <MainWrapper>
            {
                isEdit ?  
                    <EditUserProfile onSet={setIsEdit} /> 
                    : 
                    <UserProfile onSet={setIsEdit} data={userInfo} />
            }
        </MainWrapper>
    )
}

export default UserPage