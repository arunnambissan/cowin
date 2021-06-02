import React, { useEffect } from 'react';
import useAuth from '../auth/useAuth';
import FullScreenLoader from '../components/FullScreenLoader';

export default () => {

    const { listenAuthState } = useAuth();

    useEffect(() => {
        listenAuthState();
    }, []);

    return <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FullScreenLoader />
    </div>
}