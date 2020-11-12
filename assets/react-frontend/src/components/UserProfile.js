import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"

import UserPicture from "../../assets/user.png"

const Wrapper = styled.div`

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
            width: 70px;
            padding: .2rem;
            border-radius: 5px;

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
            font-weight: bold
        }

        .element-value {
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

    const goEdit = () => {
        props.onSet(true)
    }

    const history = useHistory()

    const { email, name } = props.data

    const goHome = () => {
        history.push('/')
    }

    return (
        <Wrapper>
            <img src={UserPicture} alt="Anonymous User Picture" />
            <div className="information-wrapper">
                <div className="element-wrapper">
                    <h4 className="element-label">Email:</h4>
                    <h4 className="element-value">{email}</h4>
                </div>
                <div className="element-wrapper">
                    <h4 className="element-label">User Name:</h4>
                    <h4 className="element-value">{name}</h4>
                </div>
            </div>
            <div className="btn-wrapper">
                <button onClick={goHome}>Home</button>
                <button onClick={goEdit}>Edit</button>
            </div>
        </Wrapper>
    )
}

export default UserProfile