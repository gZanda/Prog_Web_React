import React from 'react';
import './sidebar.styles.css';

import Logo from '../../../assets/logos/logo.svg';

const ListSidebar = [
    {
        title: 'Início',
        icon: 'fas fa-home',
        redirect: '/admin/inicio',
    },
    {
        title: 'Tarefas',
        icon: 'fas fa-home',
        redirect: '/admin/tarefas',
    }
];

export default function Sidebar() {
    return (
        <aside className={`Sidebar`}>
            <div className={`container container-sidebar`}>
                <div className={`row`}>
                    <div
                        className={`col d-flex justify-content-center align-items-center`}>
                        <img
                            src={Logo}
                            className={`img-fluid my-4`}
                            width={`200px`}
                            alt="Mercearia do Seu Zé"
                        />
                    </div>
                </div>
                <ul>
                    {ListSidebar.map((item, index) => {
                        return (
                            <a className={'sidebar-link'} key={index.toString()} href={item.redirect}>
                                <li>
                                    <span className={item.icon} />
                                    <span className={`sidebar-item`}>{item.title}</span>
                                </li>
                            </a>
                        );
                    })}
                    <a href={`/`} className={'sidebar-link'}>
                        <li>
                            <span className={'fas fa-arrow-circle-left'} />
                            <span className={`sidebar-out`}>Sair</span>
                        </li>
                    </a>
                </ul>
            </div>
        </aside>
    );
}
