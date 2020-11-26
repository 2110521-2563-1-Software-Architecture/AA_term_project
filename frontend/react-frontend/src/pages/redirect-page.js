import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"

import ProfileRedirectCard from '../components/ProfileRedirectCard'
import HistoryRedirectCard from '../components/HistoryRedirectCard'

const Wrapper = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 3rem 20rem 0 20rem;
    
    .container-wrapper {
        display: flex;
        flex-direction: column;
    }

    .element-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .element-wrapper.element-left {
        margin-right: 20rem;

    }

    .element-wrapper.element-right {
        margin-left: 20rem;
    }

`

const RedirectPage = () => {

    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('token')) {history.push('/')}
    }, [])

    return (
        <Wrapper>
            <div className="container-wrapper">
                <div className="element-wrapper element-left">
                    <ProfileRedirectCard />
                </div>
                <div className="element-wrapper element-right">
                    <HistoryRedirectCard />
                </div>
            </div>
        </Wrapper>
    )
}

export default RedirectPage