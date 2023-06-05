import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';

function GoDutchResult(props){
    return(
        <div className='goDutchLeftPart'>
            <div className='mainLeftTopText'>
                정산결과
            </div>
            <hr className='goDutchHr'></hr>
            <p className='explainText' style={{textAlign: "center"}}>
                사람마다 디테일한 금액을 조정할 수 있습니다! <br></br>
                금액을 변경한 후, 'update' 버튼을 눌러주세요!
            </p>

            <div className='dutchResult'>
                <div className='dutchSubTitle'>Member 1</div>
                <span className='phoneInfoBox'>
                    010-1111-1111
                </span>
                <span>
                    <input className='individualMoneyBox' value={333}></input>
                </span>
                <span className='updateBtn'>Update</span>
            </div>

            <div className='goDutchLeftBottomText'>
                총 인원 : 명<br></br>
                정산 금액 : {props.inputMoney}원
            </div>
        </div>

        
    );
}

export default GoDutchResult;