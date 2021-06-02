import React from 'react';
import Screen from '../../layout/Screen';
import { Grid, Box, Typography } from '@material-ui/core';
import LoginForm from './LoginForm';

export default () => {

    return (
        <Screen title="Welcome">
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <LoginForm />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Screen>
    )
}