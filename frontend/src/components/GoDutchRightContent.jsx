import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function GoDutchRightContent(props){
    const [inputBank, setInputBank] = useState(props.userInfo.bank);
    const [inputAccount, setInputAccount] = useState(props.userInfo.account);
    const [valid, setValid] = useState(true);
    const [checkContentBlank, setCheckContentBlank] = useState(false);
    const [checkMoneyBlank, setCheckMoneyBlank] = useState(false);

    const changeBank = (e) => {
        const bankInputValue = document.getElementsByClassName('selectBank')[0].value;
        console.log("select Bank : ", bankInputValue);
        setInputBank(bankInputValue);
    };

    const checkAccount = (e) => {
        var accountInputValue = e.target.value;
        accountInputValue = accountInputValue.replaceAll(/[^0-9]/g, "");
        setInputAccount(accountInputValue); // 숫자가 아닌 모든 문자 제거

        const formData = new FormData();
        formData.append('inputBank', inputBank);
        formData.append('inputAccount', accountInputValue);

        axios({
            method: "post",
            url: 'http://localhost:8090/checkValidAccount',
            data: formData
        })
        .then(function(response){
            setValid(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    };

    const changeContent = (e) => {
        if(e.target.value != ""){
            setCheckContentBlank(true);
        } else{
            setCheckContentBlank(false);
        }
    };

    const changeMoney = (e) => {
        props.setInputMoney(e.target.value);
        if(e.target.value != ""){
            setCheckMoneyBlank(true);
        } else{
            setCheckMoneyBlank(false);
        }
    };

    const clickDutchPayBtn = (e) => {
        console.log(checkContentBlank, checkMoneyBlank);

        if(checkContentBlank == true && checkMoneyBlank === true){
            console.log("no blank");
            // member별 금액 확인 
        } else{
            let timerInterval;
            Swal.fire({
                title: '빈칸이 있습니다',
                html: '모두 입력한 후 정산하기 버튼을 눌러주세요 :) ',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {}
            })
        }
    };

    return(
        <div className='mainRightPart'>
            <div className="dutchTitle">정산하기</div>
            <div className='dutchSubTitle'>정산할 내용</div>
            <input className='ducthInputBox' id='goDutchContent' 
                onChange={changeContent}
                placeHolder={checkContentBlank === false ? "정산할 내용을 입력해주세요!" : ""}
            ></input>

            <div className='dutchSubTitle'>정산할 금액</div>
            <input className='ducthInputBox' id='goDutchMoney' 
                onChange={changeMoney}
                placeHolder={checkMoneyBlank === false ? "정산할 금액을 입력해주세요!" : ""}
            ></input>

            <div className='dutchSubTitle'>계좌번호</div>
            <select class="selectBank" value={inputBank} onChange={changeBank}>
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

            <input className='ducthInputBox' value={inputAccount} onChange={checkAccount}></input>

            {valid 
            ? <div style={{ color: 'green' }}>Valid Account</div> 
            : <div style={{ color: 'red' }}>Check your account</div>}

            <div className='dutchPayBtn' onClick={clickDutchPayBtn}>
                <img src="/images/goDutch.png" className='goDutchImg'/>
                <div className='dutchPayText'>정산하기</div>
            </div>
        </div> 
    );
}

export default GoDutchRightContent;