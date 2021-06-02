import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkButton({ children, to, ...rest }) {
    return (
        <Button size="small" color="primary" variant="contained" component={Link} to={to} {...rest}>
            {children}
        </Button>
    );
}