import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import ReceivePayBox from './ReceivePayBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RightContent(props){    
    const navigate = useNavigate();
    console.log("%%", props.dutchMoneyList);

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
                titleList={props.titleList}
                dutchMoneyList={props.dutchMoneyList}
            />
            <ReceivePayBox
                middleTitle="완료"
                state="off"
                offLen={props.offLen}
                groupsEntityList={props.groupsEntityList}
                memberLen={props.memberLen}
                titleList={props.titleList}
                dutchMoneyList={props.dutchMoneyList}
            />
        </div> 
    );
}

export default RightContent;