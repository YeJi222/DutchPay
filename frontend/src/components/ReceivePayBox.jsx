import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function ReceivePayBox(props){
    const navigate = useNavigate();
    
    // console.log(props.memberLen);
    const confirmBtnAction = (e) => {
        var groupId = e;
        var path = '/confirm/' + groupId;
        console.log("path : ", path);

        navigate(path, {
            state: {
                userInfo: props.userInfo,
                groupId: groupId
            }
        });
    }

    return(
        <div>
            <div className="middleTitle">
                {props.middleTitle} {'('}{props.state === "on" ? props.onLen : props.offLen}{')'}
            </div>
            <div className='boxListArea'>
                {props.groupsEntityList !== undefined ? (
                    props.groupsEntityList.map((item, idx) => (
                        item.state === props.state ? (
                            <div className='payBox'>
                                <div className='payName'>
                                    <p className='payTitleName'>{props.titleList[idx]}</p>
                                    <p style={{fontSize: "12px;", marginTop: "-5px", marginBottom: "-8px"}}>({item.timestamp.substring(0, 10)})</p>
                                    <hr ></hr>
                                    <div className='payContent'>
                                        총 인원 : {props.memberLen[idx]}명<br></br>
                                        총 금액 : {props.dutchMoneyList[idx]}원
                                    </div>
                                    <div className='confirmBtn' onClick={(e) => confirmBtnAction(item.compositeKey.groupId)}> 
                                    {/* (item.compositeKey.groupId) */}
                                        확인하기 {'>'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default ReceivePayBox;