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

const displayText = () => {
    const user_role = localStorage.getItem('Role');
    if (user_role === "Manager") {
        return "Área Administrativa";
    }
    else {
        return "Área do Funcionário";
    }
};

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
                        <BaseView component={<Home />} title={displayText()} />
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
