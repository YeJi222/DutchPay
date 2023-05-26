import React, { useState } from 'react';

function Toggle(props){
    

    

    return(
        // <button className='toggleBtn' onClick={handleToggle}>
        //     {isToggled ? 'ON' : 'OFF'}
        // </button>
        <div className='toggleArea' onClick={props.handleToggle}>
            <input type="checkbox" id="toggle" className="toggleCheckbox" />
            <label for="toggle" className='toggleContainer'>
                <div>login</div>   
                <div>sign up</div>
            </label>
        </div>
    );
}

export default Toggle;