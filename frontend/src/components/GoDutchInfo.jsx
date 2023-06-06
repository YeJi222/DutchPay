import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import ReceivePayBox from './ReceivePayBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function GoDutchInfo(props){    
    const navigate = useNavigate();
    // console.log(props.groupsEntityList);

    

    return(
        <div>
            <div className='goDutchTitleArea'>
                <div className="dutchTitle">정산하기</div>
                <div className='addDutchContent'>
                    +
                </div>
            </div>
            
            <div className='goDutchRightPart'>
                <div className='dutchInfo'>
                    <div className='dutchSubTitle'>정산할 내용</div>
                    <input className='ducthInputBox' id='goDutchContent' 
                        onChange={changeContent}
                        placeHolder={props.checkContentBlank === false ? "정산할 내용을 입력해주세요!" : ""}
                    ></input>

                    <div className='dutchSubTitle'>정산할 금액</div>
                    <input className='ducthInputBox' id='goDutchMoney' 
                        onChange={changeMoney} value={props.inputMoney}
                        placeHolder={props.checkMoneyBlank === false ? "정산할 금액을 입력해주세요!" : ""}
                    ></input>

                    <div className='dutchSubTitle'>계좌번호</div>
                    <select class="selectBank" value={props.inputBank} onChange={changeBank}>
                        <option value="기업">기업</option>
                        <option value="국민">국민</option>
                        <option value="하나">하나</option>
                        <option value="농협">농협</option>
                        <option value="우리">우리</option>
                        <option value="신한">신한</option>
                        <option value="부산">부산</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                        <option value="기타">기타</option>
                    </select>

                    <span className='alignDirection'>
                        {props.valid 
                        ? <span style={{ color: 'green' }}>Valid Account</span> 
                        : <span style={{ color: 'red' }}>Check your account</span>}
                        <div>
                            <input className='ducthInputBox' value={props.inputAccount} onChange={checkAccount}></input> 
                        </div>
                    </span>

                    <span className='verticalDirection'>
                        <input className='ducthAccountInputBox' value={props.inputAccount} onChange={checkAccount}></input>
                        
                        {props.valid 
                        ? <div style={{ color: 'green' }}>Valid Account</div> 
                        : <div style={{ color: 'red' }}>Check your account</div>}
                    </span>

                    <div className='dutchPayBtn' onClick={clickDutchPayBtn}>
                        <img src="/images/goDutch.png" className='goDutchImg'/>
                        <div className='dutchPayText'>정산하기</div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default GoDutchInfo;