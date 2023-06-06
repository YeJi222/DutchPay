import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import ReceivePayBox from './ReceivePayBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function GoDutchMessage(props){    
    const navigate = useNavigate();
    // console.log(props.groupsEntityList);

    return(
        <div className='mainRightPart'>
            <div className='goDutchTitleArea'>
                <div className="dutchMessageTitle">
                    메시지 전송하기
                </div>
                <img className='messageImg' src="/images/message.png"></img>
                <textarea className='textareaCSS'>

                </textarea>
            </div>
        </div> 
    );
}

export default GoDutchMessage;