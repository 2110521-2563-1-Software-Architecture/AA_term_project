import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import User from "../../assets/user.png"

const FlipCardWrap = styled.div`

    position: relative;
    width: 250px;
    height: 320px;
    cursor: pointer;

    .card {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        border-radius: 2rem;
        transition: all 1s ease;

        :hover {
            transform: rotateY(180deg)
        }
    }

    .front {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 2rem;
        color: black;

        img {
            width: 250px;
            height: 320px;
            border-radius: 2rem;
            border: 5px solid black;
        }
    }

    
    .back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background-color: pink;
        border: 5px solid black;
        border-radius: 2rem;
        color: black;
        transform: rotateY(180deg);

        h6 {
            font-size: 24px;
            color: black;
            font-weight: bold;
            text-align: center;
            margin-top: 3rem;
            padding: 0 2rem;
        }
    }

`

const ProfileRedirectCard = () => {

    const history = useHistory()
    const goToProfilePage = () => {history.push('/user')}

    return (
        <FlipCardWrap onClick={goToProfilePage}>

            <div className="card">
                <div className="front">
                    <img src={User} />
                </div>
                <div className="back">
                    <h6>หิวแดกข้าว ห้าวแดกตีน</h6>
                </div>
            </div>
            
        </FlipCardWrap>
    )
}

export default ProfileRedirectCard