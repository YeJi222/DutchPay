import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import ReceivePayBox from './ReceivePayBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function GoDutchRightContent(props){    
    const navigate = useNavigate();
    console.log(props.groupsEntityList);

    return(
        <div className='mainRightPart'>
            <div className="receiveTitle">정산 List</div>
            
        </div> 
    );
}

export default GoDutchRightContent;