import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ConfirmRightContent(props){    
    const navigate = useNavigate();
    // console.log("%%", props.dutchMoneyList);

    // console.log(props.title);

    return(
        <div className='mainRightPart'>
            <div className="receiveTitle">정산 현황 확인하기</div>
            
        </div> 
    );
}

export default ConfirmRightContent;