import React from 'react';
import './baseView.styles.css';

export default function BaseView ({component, title}) {
    return (
        <div className={'container'}>
            <div className={`row pt-4`}>
                <div className={`col title-view`}>{title}</div>
            </div>
            <div className={'row'}>
                <div className={`col component`}>{React.cloneElement(component)}</div>
            </div>
        </div>
    );
};