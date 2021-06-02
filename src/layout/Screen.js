import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import useAuth from '../auth/useAuth';
import FullScreenLoader from './../components/FullScreenLoader';

export default ({ children, title, isLoading }) => {

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        document.title = title + ' | CoWIN - Stapto';
    }, []);

    return isAuthenticated() ? <Box pt={12}>
        {isLoading && <FullScreenLoader />}
        {children}
    </Box> : children;
}
