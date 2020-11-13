import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Spy from "../../assets/spy.jpg"

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

const HistoryRedirectCard = () => {

    const history = useHistory()
    const goToHistoryPage = () => {history.push('/history')}

    return (
        <FlipCardWrap onClick={goToHistoryPage}>

            <div className="card">
                <div className="front">
                    <img src={Spy} />
                </div>
                <div className="back">
                    <h6>This is back side</h6>
                </div>
            </div>
            
        </FlipCardWrap>
    )
}

export default HistoryRedirectCard