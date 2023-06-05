import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GoDutchResult from './GoDutchResult';

function GoDutchRightContent(props){
    const groupId = props.groupId;
    const [inputBank, setInputBank] = useState(props.userInfo.bank);
    const [inputAccount, setInputAccount] = useState(props.userInfo.account);
    const [valid, setValid] = useState(true);
    const [inputContent, setInputContent] = useState(props.userInfo.account);
    const [checkContentBlank, setCheckContentBlank] = useState(false);
    const [checkMoneyBlank, setCheckMoneyBlank] = useState(false);
    const phoneBoxes = props.phoneBoxes;

    console.log("groupId : ", groupId);

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
            console.log(valid);
        })
        .catch(function(error){
            console.log(error);
        })
    };

    const changeContent = (e) => {
        setInputContent(e.target.value);

        if(e.target.value != ""){
            setCheckContentBlank(true);
        } else{
            setCheckContentBlank(false);
        }
    };

    const changeMoney = (e) => {
        props.setInputMoney(e.target.value.replaceAll(/[^0-9]/g, "")); // 숫자형식만 가능

        if(e.target.value != ""){
            setCheckMoneyBlank(true);
        } else{
            setCheckMoneyBlank(false);
        }
    };

    const clickDutchPayBtn = (e) => {
        var phoneBlankCheck = true;
        var phoneFormatCheck = true;
        var phoneValueList = [];

        phoneBoxes.map((box, index) => {
            phoneValueList.push(JSON.stringify(box.value).substring(1, JSON.stringify(box.value).length - 1)); // 숫자만 들어가게 
            // console.log(box);
            // console.log("clickDutchPayBtn", JSON.stringify(box.value).length);
            if(JSON.stringify(box.value).length === 2){ // blank
                // console.log("clickDutchPayBtn", JSON.stringify(box.value));
                phoneBlankCheck = false;
            }
            console.log("clickDutchPayBtn", JSON.stringify(box.value).length);
            if(JSON.stringify(box.value).length != 13){ // validation(전화번호 : 11자리)
                phoneFormatCheck = false;
                let timerInterval;
                Swal.fire({
                    title: '전화번호 형식이 맞지 않습니다',
                    html: '입력한 전화번호를 다시 한 번 확인해주세요 :) ',
                    timer: 2000,
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
        });

        console.log("phoneBlankCheck", phoneBlankCheck);
        if(phoneBlankCheck === false){
            let timerInterval;
            Swal.fire({
                title: '전화번호 입력에 빈칸이 있습니다',
                html: '빈칸이 있는 전화번호 란을 지우거나, 채운 후 입력해주세요 :) ',
                timer: 2000,
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
        } else{
            if(checkContentBlank === false || checkMoneyBlank === false){
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

            if(checkContentBlank === true && checkMoneyBlank === true && phoneFormatCheck === true){
                props.setIsResult(true);
                // n_money 계산
                var totalMoney = props.inputMoney;
                var members = phoneValueList;
                var n_money = Math.ceil(totalMoney/members.length);

                // db에 insert
                const formData = new FormData();
                formData.append('groupId', groupId);
                formData.append('payContent', inputContent);
                formData.append('totalMoney', totalMoney);
                formData.append('members', members);
                formData.append('userId', props.userId);
                formData.append('userBank', inputBank);
                formData.append('userAccount', inputAccount);
                formData.append('n_money', n_money);

                axios({
                    method: "post",
                    url: 'http://localhost:8090/createDutchPayGroup',
                    data: formData
                })
                .then(function(response){
                    // console.log("response", response.data);
                    props.setResultMembers(response.data);
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    };

    return(
        <div className='mainRightPart'>
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
                        placeHolder={checkContentBlank === false ? "정산할 내용을 입력해주세요!" : ""}
                    ></input>

                    <div className='dutchSubTitle'>정산할 금액</div>
                    <input className='ducthInputBox' id='goDutchMoney' 
                        onChange={changeMoney} value={props.inputMoney}
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

                    <span className='alignDirection'>
                        {valid 
                        ? <span style={{ color: 'green' }}>Valid Account</span> 
                        : <span style={{ color: 'red' }}>Check your account</span>}
                        <div>
                            <input className='ducthInputBox' value={inputAccount} onChange={checkAccount}></input> 
                        </div>
                    </span>

                    <span className='verticalDirection'>
                        <input className='ducthAccountInputBox' value={inputAccount} onChange={checkAccount}></input>
                        
                        {valid 
                        ? <div style={{ color: 'green' }}>Valid Account</div> 
                        : <div style={{ color: 'red' }}>Check your account</div>}
                    </span>

                    <div className='dutchPayBtn' onClick={clickDutchPayBtn}>
                        <img src="/images/goDutch.png" className='goDutchImg'/>
                        <div className='dutchPayText'>정산하기</div>
                    </div>
                </div>

                {/* <div className='dutchResult'>
                    <div className="dutchTitle">정산결과</div>
                    <div className='dutchSubTitle'>Member 1</div>
                    <span className='phoneInfoBox'>
                        010-1111-1111
                    </span>
                    <span>
                        <input className='individualMoneyBox' value={333}></input>
                    </span>
                    <span className='updateBtn'>Update</span>
                </div> */}

                <GoDutchResult/>
            </div>
        
        </div> 
    );
}

export default GoDutchRightContent;