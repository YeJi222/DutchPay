import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ConfirmRightContent(props){    
    const navigate = useNavigate();
    const groupInfo = props.groupInfo;
    const groupId = props.groupId;

    const clickState = (color, phone) => {
        // console.log('color', color);
        // console.log('phone', phone);

        const formData = new FormData();
        formData.append('groupId', groupId);
        formData.append('phone', phone);
        formData.append('state', color);

        axios({
            method: "post",
            url: 'http://localhost:8090/changeState',
            data: formData
        })
        .then(function(response){
            props.setStateFlag(!props.stateFlag);
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    if(groupInfo != undefined){
        return(
            <div className='mainRightPart'>
                <div className="receiveTitle">정산 현황 확인하기</div>
                <div>
                <table className='contentsTable'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Contents</th>
                                <th>Money</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupInfo.contentList.map((content, idx) => (
                                <tr>
                                    <td>{idx+1}</td>
                                    <td>{content.content}</td>
                                    <td>{content.dutchMoney}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className='confirmTable'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>정산 Members</th>
                                <th>State</th>
                                <th>N money</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupInfo.membersInfo.map((member, idx) => (
                                <tr>
                                    <td>{idx+1}</td>
                                    <td>{member.compositeKey.phone}</td>
                                    <td>
                                        {
                                            member.sendState === 'no' ? (
                                                <img onClick={(color, phone) => clickState('redBtn', member.compositeKey.phone)} className='stateBtn' src='/images/redBtn.png'></img>
                                            ) : (
                                                <img onClick={(color, phone) => clickState('greenBtn', member.compositeKey.phone)} className='stateBtn' src='/images/greenBtn.png'></img>
                                            )
                                        }
                                        
                                    </td>
                                    <td>{
                                            member.nmoney != "" ? (
                                                member.nmoney
                                            ) : (
                                                "0"
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                
            </div> 
        );
    }
}

export default ConfirmRightContent;