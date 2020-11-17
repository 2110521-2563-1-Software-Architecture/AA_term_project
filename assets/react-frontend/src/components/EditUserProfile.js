import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Axios from 'axios'
import { useFormik } from 'formik'

import UserPicture from "../../assets/user.png"
import UploadIcon from "../../assets/upload.png"
import ProfilePictureContext from "../utils/context/profilePictureContext"

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

        .error-label {
            color: red;
            text-align: left;
            margin-top: 1rem;
        }
    }

    .btn-wrapper {
        display: flex;
        justify-content: space-evenly;
        margin: 0 8rem 1rem 8rem;

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
        margin-right: 1rem;
        margin-bottom: .5rem;

        .element-label {
            font-weight: bold;
            margin-top: -1px;
        }

        .element-input {
            padding-left: .5rem;
            width: 320px;
            height: 27px;
        }

    }

    @media (max-width: 800px) {
        min-width: 400px;
        height: auto;

        .information-wrapper {
            flex-direction: column;
            margin-top: 4rem;

            .error-label {
                text-align: center;
            }
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

    const formik = useFormik({
        initialValues: {
            newName: ""
        },
        validate: val => {
            const errors = {}
            if (!val.newName) {
                errors.newName = "New name cannot be empty"
            }
            return errors
        },
        onSubmit: async () => {

            const JwtToken = `JWT ${localStorage.getItem('token')}`
            const data = {name: formik.values.newName}
            await Axios.patch("http://aa-shortener.poomrokc.services/api/user/profile"
            , data, { headers: { Authorization: JwtToken } })
            
            if (isPictureSet) {
                
                const newPicture = new FormData()
                newPicture.append("Image", file)

                const { status } = await Axios.post("http://aa-shortener.poomrokc.services/api/user/profilePicture", newPicture, { headers: { Authorization: JwtToken } })

                if (status === 200) {
                    setProfilePicture(prev => ({
                        ...prev,
                        reRender: !prev.reRender
                    }))
                }    
            }

            forceRender()
            goBack()
        }
    })

    const goBack = () => {
        props.onSet(false)
    }

    const forceRender = () => {
        props.reRender(prev => !prev)
    }

    const imageRegEx = "image/*"
    const [picture, setPicture] = useState(UserPicture)
    const [isPictureSet, setIsPictureSet] = useState(false)
    const [file, setFile] = useState(null)
    const { setProfilePicture } = useContext(ProfilePictureContext)

    const changeImage = (e) => {
        const { name, files, value } = e.target
        const img = name === "image" ? files[0] : value
        setFile(img)
        setPicture(URL.createObjectURL(img))
        setIsPictureSet(true)
    }

    return (
        <Wrapper>
            <ImageUploadWrapper>
                <img className="image" src={picture} alt="Anonymous User Picture" />
                <img className="upload" src={UploadIcon} />
                <input name="image" type="file" accept={imageRegEx} onChange={changeImage} />
            </ImageUploadWrapper>
            <div className="information-wrapper">
                <div className="element-wrapper">
                    <h4 className="element-label">New User Name:</h4>
                    <input
                        id="newName"
                        name="newName"
                        className="element-input" 
                        type="text" 
                        placeholder="New User Name"
                        value={formik.values.newName} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.errors.newName && formik.touched.newName  &&
                    <h5 className="error-label">{formik.errors.newName}</h5>}
            </div>
            <div className="btn-wrapper">
                <button onClick={goBack}>Go Back</button>
                <button type="submit" onClick={formik.handleSubmit}>Update</button>
            </div>
        </Wrapper>
    )
}

export default EditUserProfile