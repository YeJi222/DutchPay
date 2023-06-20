import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import ReceivePayBox from './ReceivePayBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RightContent(props){    
    const navigate = useNavigate();
    // console.log(props.groupsEntityList);

    // console.log(props.title);

    return(
        <div className='mainRightPart'>
            <div className="receiveTitle">정산 List</div>
            <ReceivePayBox
                middleTitle="진행중"
                state="on"
                onLen={props.onLen}
                groupsEntityList={props.groupsEntityList}
                memberLen={props.memberLen}
                title={props.title}
            />
            <ReceivePayBox
                middleTitle="완료"
                state="off"
                offLen={props.offLen}
                groupsEntityList={props.groupsEntityList}
                memberLen={props.memberLen}
                title={props.title}
            />
        </div> 
    );
}

export default RightContent;