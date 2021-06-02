import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';

function TopTabs(props) {

    const { location, history } = props;

    const handleChange = (event, newValue) => {
        history.push('/' + newValue);
    };

    return (
        <Tabs
            value={location.pathname.split("/")[1]}
            onChange={handleChange}
            indicatorColor="primary"
        >
            <Tab value="explore-courses" label="Explore Courses" style={{ height: 72 }} />
            <Tab value="your-courses" label="My Courses" style={{ height: 72 }} />
            {/* <Tab value="visit-website" label="Visit Website" style={{ height: 72 }} /> */}
        </Tabs>
    );
}

export default withRouter(TopTabs);
