import React from 'react';
import './sidebar.styles.css';
import Logo from '../../../assets/logos/logo.svg';
import UserType from "../../../util/UserType";


export default function Sidebar() {
    function handleClick(e) {
			localStorage.removeItem('Token');
            localStorage.removeItem('Role');
            window.location.href = "http://localhost:3000";
    }

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
                            alt={"admin"}/>
                    </div>
                </div>
                <ul>
                    <a className={'sidebar-link'} href={'/admin/inicio'}>
                        <li>
                            <i className={'bi bi-house'} style={{fontSize: 25}}/>
                            <span className={`sidebar-item mx-2`}>Início</span>
                        </li>
                    </a>
                    {
                        UserType.isManager() &&
                        <a className={'sidebar-link'} href={'/admin/usuarios'}>
                            <li>
                                <i className={'bi bi-person-fill'} style={{fontSize: 25}}/>
                                <span className={`sidebar-item mx-2`}>Usuários</span>
                            </li>
                        </a>
                    }

                    <a className={'sidebar-link'} href={'/admin/tarefas'}>
                        <li>
                            <i className={'bi bi-calendar-check'} style={{fontSize: 25}}/>
                            <span className={`sidebar-item mx-2`}>Tarefas</span>
                        </li>
                    </a>


                    <a href={`/`} className={'sidebar-link'}>
                        <li>
                            <span className={'bi bi-box-arrow-in-left'} />
                            <span className={`sidebar-out`} onClick={handleClick}>Sair</span>
                        </li>
                    </a>
                </ul>
            </div>
        </aside>
    );
}
