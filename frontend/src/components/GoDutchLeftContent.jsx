import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';

function GoDutchLeftContent(props){
    // const [phoneBoxes, setPhoneBoxes] = useState([{array: <PhoneBox phone_id="0"/>, value: ""}]);
    const phoneBoxes = props.phoneBoxes;
    const setPhoneBoxes = props.setPhoneBoxes;
    
    console.log("phoneBoxes", phoneBoxes);
    const addPhoneNumbers = (e) =>{
        console.log("phoneBoxes len", phoneBoxes.length);
        setPhoneBoxes([...phoneBoxes, {array: <PhoneBox/>, value: ""}]);
    }

    return(
        <div className='goDutchLeftPart'>
            <div className='mainLeftTopText'>
                정산할 인원
            </div>
            <div className='addMembers' onClick={addPhoneNumbers}>
                +
            </div>
            <hr className='goDutchHr'></hr>
            <p className='explainText'>정산할 인원만큼 '+'버튼을 눌러 전화번호 입력란을 추가하세요. 
                전화번호는 '-' 기호 없이 숫자만 입력해주세요.
            </p>

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