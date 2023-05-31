import React, { useEffect, useState } from 'react';

function ReceivePayBox(props){
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
                                        인원 : {} <br></br>
                                        총 금액 : {item.totalMoney}
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