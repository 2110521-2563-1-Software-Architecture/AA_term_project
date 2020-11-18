import React , { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"

import ProfilePictureContext from "../utils/context/profilePictureContext"

const Wrapper = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700&display=swap');
    border: 2px solid black;
    margin: 6rem 30rem 0 30rem;
    padding: 2rem 2rem;
    border-radius: 1rem;
    text-align: center;
    min-width: 600px;
    height: auto;

    img {
        clip-path: circle(120px at 50% 50%);
        width: 270px;
        height: 267px;
    }

    .information-wrapper {
        margin-top: 3rem;
        display: flex;
        flex-direction: column;
    }

    .btn-wrapper {
        display: flex;
        justify-content: space-evenly;
        margin: 1rem 8rem 1rem 8rem;
       
        button {
            width: 150px;
            padding: .2rem;
            border-radius: 5px;
            height:50px;
            font-family: 'Kanit', sans-serif;
            background-color: #fe7f2d;
            color:white;
            font-size:20px;
            border:none;
            :hover {
                background-color: #fe7f2d
            }
        }
    }

    .element-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1rem;

        .element-label {
            font-family: 'Kanit', sans-serif;
            font-weight: bold
        }

        .element-value {
            font-family: 'Kanit', sans-serif;
            margin-left: 0rem;
        }

    }

    @media (max-width: 800px) {
        min-width: 400px;
        height: 480px;

        img {
            width: 200px;
            height: 200px;
            clip-path: circle(95px at 50% 50%);
        }

        .information-wrapper {
            flex-direction: column
        }

        .btn-wrapper {
            margin: 1rem 4rem 0 4rem;
        }
    }

`

const UserProfile = props => {

    useEffect(() => {

    }, [props.forceRender])

    const goEdit = () => {
        props.onSet(true)
    }

    const history = useHistory()

    const { email, name } = props.data
    const { profilePicture } = React.useContext(ProfilePictureContext)

    const goHome = () => {
        history.push('/')
    }

    return (
        <Wrapper>
            <img key={Date.now()} src={profilePicture.payload} alt="Anonymous User Picture" />
            <div className="information-wrapper">
                <div className="element-wrapper">
                    <h4 className="element-label">Email:</h4>
                    <h4 className="element-value">{email}</h4>
                </div>
                <div className="element-wrapper">
                    <h4 className="element-label">Username:</h4>
                    <h4 className="element-value">{name}</h4>
                </div>
            </div>
            <div className="btn-wrapper">
                <button onClick={goEdit}>Edit</button>
            </div>
        </Wrapper>
    )
}

export default UserProfile