import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';

function GoDutchLeftContent(props){
    const [phoneBoxes, setPhoneBoxes] = useState([<PhoneBox phone_id="0"/>]);
    
    console.log("phoneBoxes", phoneBoxes);
    const addPhoneNumbers = e =>{
        console.log("phoneBoxes len", phoneBoxes.length);
        setPhoneBoxes([...phoneBoxes, <PhoneBox phone_id={phoneBoxes.length}/>]);
    }

    return(
        <div className='mainLeftPart'>
            <div className='mainLeftTopText'>
                정산할 인원
            </div>
            <div className='addMembers' onClick={addPhoneNumbers}>
                +
            </div>
            <hr className='goDutchHr'></hr>

            <div className='phoneInfoArea'>
                {phoneBoxes}
            </div>

            <div className='goDutchLeftBottomText'>
                총 인원 : {phoneBoxes.length}명<br></br>
                총 금액 : 원
            </div>
        </div>    
    );
}

export default GoDutchLeftContent;