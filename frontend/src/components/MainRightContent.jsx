import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RightContent(props){    
    const navigate = useNavigate();
    console.log(props.groupsEntityList);

    return(
        <div className='mainRightPart'>
            <div className="receiveTitle">정산 List</div>
            {/* list part component 분리시키기 */}
            <div className="middleTitle">진행중 ({props.onLen})</div>
            <div className='boxListArea'>
                {props.groupsEntityList !== undefined ? (
                    props.groupsEntityList.map((item, idx) => (
                        item.state === "on" ? (
                            <div className='payBox'>
                                <div className='payName'>{item.payContent}</div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    ))
                ) : (
                    <div></div>
                )}
            </div>
            <div className="middleTitle">완료 ({props.offLen})</div>
            <div className='boxListArea'>
                {props.groupsEntityList !== undefined ? (
                    props.groupsEntityList.map((item, idx) => (
                        item.state === "off" ? (
                            <div className='payBox'>
                                <div className='payName'>{item.payContent}</div>
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

export default RightContent;