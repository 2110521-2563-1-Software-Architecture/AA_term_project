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
        border: 2px solid black
    }

    .upload {
        width: 40px;
        margin-top: -225px;
        margin-left: -40px;
    }

    @media (max-width: 800px) {

        .image {
            width: 200px;
            height: 200px;
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
                    <input type="text" value={newName} onChange={changeName}/>
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