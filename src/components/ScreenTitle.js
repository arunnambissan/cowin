import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Breadcrumbs from './Breadcrumbs';

const ScreenTitle = ({ children, breadcrumbItems = [] }) => {
    return <Box>
        <Typography variant="h3" gutterBottom>
            <strong>{children}</strong>
        </Typography>

        {breadcrumbItems.length > 0 &&
            <Breadcrumbs items={breadcrumbItems} />
        }

        <Box mb={3} />
    </Box>
}

export default ScreenTitle;