import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import {
    IconButton,
    Typography
} from '@material-ui/core';
import {
    Input
} from '@material-ui/icons';
import useAuth from '../auth/useAuth';

export default function TopBar() {

    const { user, isAuthenticated, logOut } = useAuth();

    return (
        <AppBar variant="contained">
            <Toolbar>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography>
                            {user.name}
                        </Typography>
                        <Box mr={1} />
                        <IconButton onClick={logOut}>
                            <Input />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
