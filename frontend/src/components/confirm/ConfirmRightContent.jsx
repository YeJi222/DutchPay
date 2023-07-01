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
                                                <img className='stateBtn' src='/images/redBtn.png'></img>
                                            ) : (
                                                <img className='stateBtn' src='/images/greenBtn.png'></img>
                                            )
                                        }
                                        
                                    </td>
                                    <td>{member.nmoney}</td>
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