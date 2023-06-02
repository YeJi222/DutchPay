import React from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';

function GoDutchLeftContent(props){
    const navigate = useNavigate();

    const goDucthPay = e =>{
        navigate('/goDutch', {state: props.userInfo});
    }

    const sendMessage = e => {
        axios({
            method: "post",
            url: 'http://localhost:8090/sendMessage',
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return(
        <div className='mainLeftPart' style={{ backgroundColor: props.isToggled === "receive" ? "#FFF6F6" : "#E3EAFF" }}>
            <div className='mainLeftTopText'>
                정산할 인원
            </div>
            <div className='addMembers'>
                +
            </div>
            <hr className='goDutchHr'></hr>

            <PhoneBox/>
            
            <div className='goDutchLeftBottomText'>
                총 인원 : 명<br></br>
                총 금액 : 원
            </div>
        </div>    
    );
}

export default GoDutchLeftContent;