import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs as MiUiBreadcrumbs, Button } from '@material-ui/core';
import LinkButton from './LinkButton';

export default function Breadcrumbs({ items }) {
    return (
        <MiUiBreadcrumbs aria-label="breadcrumb">
            {items.map((item, index) => <LinkButton key={index} variant="text" color="default" to={item.path || ""} disabled={index === items.length - 1}>
                {item.title}
            </LinkButton>)}
        </MiUiBreadcrumbs>
    );
}
