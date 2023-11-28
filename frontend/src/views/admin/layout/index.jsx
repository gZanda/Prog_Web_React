import React, {useEffect} from 'react';
import './index.styles.css';
import Sidebar from './sidebar.jsx';
import {Outlet} from 'react-router-dom';

export default function Index() {
    useEffect(() => {
        let token = localStorage.getItem("Token");
        if (!token) {
            window.location.href = "http://localhost:3000/";
        }
    });

    return (
        <div className={`admin-layout`}>
            <Sidebar />
            <div className={`content`}>
                <Outlet />
            </div>
        </div>
    );
}
