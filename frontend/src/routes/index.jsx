import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../views/login';
import Index from "../views/admin/layout";
import BaseView from "../views/admin/layout/baseView";
import Home from "../views/admin/home";

const NotFound = () => {
    return <div>404 - Not Found</div>;
};

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Index />}>
                <Route
                    path="inicio"
                    element={
                        <BaseView component={<Home />} title={'Área Administrativa'} />
                    }
                />
                <Route
                    path="tarefas"
                    element={
                        <BaseView component={<Home />} title={'Tarefas'} />
                    }
                />
            </Route>
            <Route path={`*`} element={<NotFound />} />
        </Routes>
    );
}
