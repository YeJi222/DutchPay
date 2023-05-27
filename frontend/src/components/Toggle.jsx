import React, { useState, useEffect } from 'react';

function Toggle(props){
    return(
        <div className='toggleArea'>
            <input type="checkbox" id="toggle" className="toggleCheckbox" 
                onClick={props.handleToggle}
            />
            <label for="toggle" className='toggleContainer'>
                <div>login</div>   
                <div>sign up</div>
            </label>
        </div>
    );
}

export default Toggle;