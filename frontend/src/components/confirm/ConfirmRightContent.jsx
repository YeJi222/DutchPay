import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ConfirmRightContent(props){    
    const navigate = useNavigate();
    const groupInfo = props.groupInfo;

    if(groupInfo != undefined){
        return(
            <div className='mainRightPart'>
                <div className="receiveTitle">정산 현황 확인하기</div>
                <div>
                {
                    groupInfo.membersInfo.map((members, idx) => {
                        <div>{members.compositeKey.phone}</div>
                        // console.log(members.compositeKey.phone);
                    })
                }
                
                </div>
                
                
            </div> 
        );
    }
}

export default ConfirmRightContent;