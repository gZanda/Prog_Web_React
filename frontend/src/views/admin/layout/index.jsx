import React from 'react';
import './index.styles.css';
import Sidebar from './sidebar.jsx';
import { Outlet } from 'react-router-dom';

export default function Index() {
    return (
        <div className={`admin-layout`}>
            <Sidebar />
            <div className={`content`}>
                <Outlet />
            </div>
        </div>
    );
}
