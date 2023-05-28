import React, { useState, useEffect } from 'react';

function Toggle(props){

    return(
        <div className='toggleArea'>
            <input type="checkbox" id="toggle" className="toggleCheckbox"
                checked={props.isToggled} onClick={props.handleToggle}
            />
            <label htmlFor="toggle" className='toggleContainer'
            >
                <div>login</div>   
                <div>sign up</div>
            </label>

            {props.isToggled === "login" ? (
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