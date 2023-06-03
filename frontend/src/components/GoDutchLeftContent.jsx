import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';

function GoDutchLeftContent(props){
    const [phoneBoxes, setPhoneBoxes] = useState([{array: <PhoneBox phone_id="0"/>, value: ""}]);
    
    console.log("phoneBoxes", phoneBoxes);
    const addPhoneNumbers = (e) =>{
        console.log("phoneBoxes len", phoneBoxes.length);
        setPhoneBoxes([...phoneBoxes, {array: <PhoneBox/>, value: ""}]);
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
                {phoneBoxes.map((_, index) => (
                    <PhoneBox
                        key={index}
                        phoneBoxes={phoneBoxes}
                        setPhoneBoxes={setPhoneBoxes}
                        phone_id={index}
                    />
                ))}
            </div>

            <div className='goDutchLeftBottomText'>
                총 인원 : {phoneBoxes.length}명<br></br>
                정산 금액 : {props.inputMoney}원
            </div>
        </div>    
    );
}

export default GoDutchLeftContent;