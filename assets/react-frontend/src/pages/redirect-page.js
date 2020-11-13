import React, { useEffect } from 'react'
import styled from 'styled-components'

import ProfileRedirectCard from '../components/ProfileRedirectCard'
import HistoryRedirectCard from '../components/HistoryRedirectCard'

const Wrapper = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5rem 15rem 0 15rem;

`

const RedirectPage = () => {

    useEffect(() => {
        if (!localStorage.getItem('token')) {history.push('/')}
    }, [])

    return (
        <Wrapper>
            <ProfileRedirectCard />
            <HistoryRedirectCard />
        </Wrapper>
    )
}

export default RedirectPage