import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../views/login';
import Index from "../views/admin/layout";
import BaseView from "../views/admin/layout/baseView";
import Home from "../views/admin/home";
import Tasks from "../views/admin/tasks";
import SignUp from '../views/cadastrar';
import Users from '../views/admin/users';
import EditTask from "../views/admin/tasks/edit";

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
                        <BaseView component={<Tasks />} title={'Tarefas'} />
                    }
                />
                <Route
                    path="tarefas/editar"
                    element={
                        <BaseView component={<EditTask />} title={'Editar Tarefas'} />
                    }
                />
                <Route 
                    path="usuarios" 
                    element={
                        <BaseView component={<Users />} title={'Usuários'}/>
                    }
                />
            </Route>
            <Route path="/cadastrar" element={<SignUp />}/>
            <Route path={`*`} element={<NotFound />} />
        </Routes>
    );
}
