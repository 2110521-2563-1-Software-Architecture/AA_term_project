import React, { useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

import UserPicture from "../../assets/user.png"
import UploadIcon from "../../assets/upload.png"

const ImageUploadWrapper = styled.label`

    cursor: pointer;

    input[type="file"] {
        display: none;
    }

    .image {
        width: 270px;
        height: 267px;
        clip-path: circle(120px at 50% 50%);
    }

    .upload {
        width: 40px;
        margin-top: -205px;
        margin-left: -50px;
    }

    @media (max-width: 800px) {

        .image {
            width: 200px;
            height: 200px;
            clip-path: circle(95px at 50% 50%);
        }

        .upload {
            width: 30px;
            margin-top: -170px;
            margin-left: -30px;
        }
    }

`

const Wrapper = styled.div`

    border: 2px solid black;
    margin: 6rem 30rem 0 30rem;
    padding: 2rem 2rem;
    border-radius: 1rem;
    text-align: center;
    min-width: 600px;
    height: auto;

    .information-wrapper {
        margin-top: 3rem;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
    }

    .btn-wrapper {
        display: flex;
        justify-content: space-evenly;
        margin: 1rem 8rem 1rem 9rem;

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
        margin-right: 10rem;
        margin-bottom: 1rem;

        .element-label {
            font-weight: bold
        }

        .element-input {
            padding-left: .5rem;
        }

    }

    @media (max-width: 800px) {
        min-width: 400px;
        height: 480px;

        .information-wrapper {
            flex-direction: column;
            margin-top: 4rem;
        }

        .btn-wrapper {
            margin: -0.5rem 4rem 0 4rem;
        }

        .element-wrapper {
            flex-direction: column;
            text-align: left;

            .element-input {
                width: 332px;
                padding-left: .5rem;
            }
        }
    }

`

const EditUserProfile = props => {

    const goBack = () => {
        props.onSet(false)
    }

    const forceRender = () => {
        props.reRender(prev => !prev)
    }

    const imageRegEx = "image/*"
    const [picture, setPicture] = useState(UserPicture)

    const changeImage = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
    }

    const [newName, setNewName] = useState('')
    const changeName = (e) => {
        setNewName(e.target.value)
    }

    const update = async () => {

        const JwtToken = `JWT ${localStorage.getItem('token')}`
        const data = {name: newName}
        const res = await Axios.patch("http://aa-shortener.poomrokc.services/api/user/profile", data, { headers: { Authorization: JwtToken } })

        forceRender()
        goBack()
    }

    return (
        <Wrapper>
            <ImageUploadWrapper>
                <img className="image" src={picture} alt="Anonymous User Picture" />
                <img className="upload" src={UploadIcon} />
                <input type="file" accept={imageRegEx} onChange={changeImage} />
            </ImageUploadWrapper>
            <div className="information-wrapper">
                <div className="element-wrapper">
                    <h5 className="element-label">New User Name:</h5>
                    <input className="element-input" type="text" value={newName} onChange={changeName}/>
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