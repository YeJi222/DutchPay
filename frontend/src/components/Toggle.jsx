import React, { useState, useEffect } from 'react';

function Toggle(props){
    return(
        <div className={props.toggleName === "loginToggle" ? "loginToggleArea" : "mainToggleArea"}>
            <input type="checkbox" id="toggle" className="toggleCheckbox"
                checked={props.isToggled} onClick={props.handleToggle}
            />
            {props.toggleName === "loginToggle" ? (
                <label htmlFor="toggle" className='toggleContainer'>
                    <div>login</div>   
                    <div>sign up</div>
                </label>
            ) : (
                <label htmlFor="toggle" className='toggleContainer'>
                    <div>receive</div>   
                    <div>send</div>
                </label>
            )}
            {props.isToggled === "login" || props.isToggled === "receive" ? (
                <style>
                {`.toggleCheckbox:checked + .toggleContainer::before {
                    left: 0%;
                }`}
                {`.toggleCheckbox:checked + .toggleContainer div:first-child {
                    color: #111111;
                    transition: color 0.3s;
                }`}
                </style>
            ):
            (
                <style>
                {`.toggleCheckbox:checked + .toggleContainer::before {
                    left: 50%;
                }`}
                {`.toggleCheckbox:checked + .toggleContainer div:last-child {
                    color: #111111;
                    transition: color 0.3s;
                }`}
                </style>
            )}
        </div>
    );
}

export default Toggle;