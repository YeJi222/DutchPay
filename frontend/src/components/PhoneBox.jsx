import React from 'react';

function PhoneBox(props){
    console.log("phoneBox key : ", props.phone_id);
    return(
        <div className='phoneInputArea'>
            <input className='phoneInput'></input>
            <div className='deleteMembers'>
                -
            </div>
        </div>
    );
}

export default PhoneBox;