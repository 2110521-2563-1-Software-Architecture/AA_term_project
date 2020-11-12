import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"

import UserPicture from "../../assets/user.png"

const ImageUploadWrapper = styled.label`

    cursor: pointer;

    input[type="file"] {
        display: none;
    }

    img {
        width: 270px;
        height: 267px;
        border: 2px solid black
    }

`

const Wrapper = styled.div`

    border: 2px solid black;
    margin: 6rem 30rem 0 30rem;
    padding: 2rem 2rem;
    border-radius: 1rem;
    text-align: center;
    min-width: 600px;
    height: 540px;

    .information-wrapper {
        margin-top: 5rem;
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
        }

        .information-wrapper {
            flex-direction: column;
            margin-top: 3rem;
        }

        .btn-wrapper {
            margin: 1rem 4rem 0 4rem;
        }
    }

`

const EditUserProfile = props => {

    const goBack = () => {
        props.onSet(false)
    }

    const update = () => {
        console.log('update')
    }

    const imageRegEx = "image/*"
    const [picture, setPicture] = useState(UserPicture)

    const changeImage = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
    }
    
    return (
        <Wrapper>
            <ImageUploadWrapper>
                <img src={picture} alt="Anonymous User Picture" />
                <input type="file" accept={imageRegEx} onChange={changeImage} />
            </ImageUploadWrapper>
            <div className="information-wrapper">
                <div className="element-wrapper">
                    <h5 className="element-label">New User Name:</h5>
                    <input type="text" />
                </div>
            </div>
            <div className="btn-wrapper">
                <button onClick={goBack}>Go Back</button>
                <button onClick={update}>Update</button>
            </div>
        </Wrapper>
    )
}

export default EditUserProfile