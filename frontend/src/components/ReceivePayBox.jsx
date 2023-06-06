import React, { useEffect, useState } from 'react';

function ReceivePayBox(props){
    // console.log(props.memberLen);
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
                                    {item.payContent}
                                    <hr ></hr>
                                    <div className='payContent'>
                                        인원 : {props.memberLen[idx]}명<br></br>
                                        총 금액 : {item.totalMoney}원
                                    </div>
                                    <div className='confirmBtn'>
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