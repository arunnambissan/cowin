import React from 'react';
import Container from '@material-ui/core/Container';
import TopBar from './TopBar';
import useAuth from '../auth/useAuth';

export default function AppContainer({ children }) {

    const { isAuthenticated } = useAuth();

    return <>

        {isAuthenticated() && <TopBar />}

        <Container maxWidth="xl" style={{ background: "#F9F9FB", minHeight: '100vh' }}>
            {children}
        </Container>
    </>
}