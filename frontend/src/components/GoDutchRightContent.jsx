import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GoDutchResult from './GoDutchResult';
import ContentBox from './ContentBox';

function GoDutchRightContent(props){
    const groupId = props.groupId;
    const [inputBank, setInputBank] = useState(props.userInfo.bank);
    const [inputAccount, setInputAccount] = useState(props.userInfo.account);
    const [valid, setValid] = useState(true);
    const [inputContent, setInputContent] = useState(props.userInfo.account);
    const [checkContentBlank, setCheckContentBlank] = useState(false);
    const [checkMoneyBlank, setCheckMoneyBlank] = useState(false);
    // const phoneBoxes = props.phoneBoxes;
    const [contentBoxes, setContentBoxes] = useState([{array: <ContentBox content_id="0"/>, content: "", money: "", phones: []}]);

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

    const clickDutchPayBtn = (e) => {
        console.log("contentBoxes", contentBoxes);
        console.log("checkContentBlank", checkContentBlank);
        console.log("checkMoneyBlank", checkMoneyBlank);

        var contentBlank = false;
        var moneyBlank = false;
        var phonesBlank = false;
        var totalMoney = 0;

        for(var i = 0 ; i < contentBoxes.length ; i++){
            console.log("content", contentBoxes[i].content);
            console.log("money", contentBoxes[i].money);
            console.log("phones", contentBoxes[i].phones);

            totalMoney += Number(contentBoxes[i].money);
            props.setInputMoney(totalMoney);

            if(contentBoxes[i].content === ''){
                contentBlank = true; // blank 있음
            }
            if(contentBoxes[i].money === ''){
                moneyBlank = true; // blank 있음
            }
            if(contentBoxes[i].phones.length === 0){
                phonesBlank = true; // blank 있음
            }
        }
        console.log("contentBlank", contentBlank);
        console.log("moneyBlank", moneyBlank);
        console.log("phonesBlank", phonesBlank);

        if(contentBlank === true || moneyBlank === true || phonesBlank === true){
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
        } else{
            // total money 계산

            // n_money 계산
            // var totalMoney = props.inputMoney;
            // var members = phoneValueList;
            // var n_money = Math.ceil(totalMoney/members.length);

            // db에 insert
            const formData = new FormData();
            // formData.append('groupId', groupId);
            // formData.append('payContent', inputContent);
            // formData.append('totalMoney', totalMoney);
            // formData.append('userId', props.userId);
            // formData.append('userBank', inputBank);
            // formData.append('userAccount', inputAccount);
            // formData.append('n_money', n_money);

            axios({
                method: "post",
                url: 'http://localhost:8090/createDutchPayGroup',
                data: formData
            })
            .then(function(response){
                props.setIsResult(true);
                // console.log("response", response.data);
                // props.setResultMembers(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }

        // if(checkContentBlank === true && checkMoneyBlank === true){
        //     props.setIsResult(true);
        //     // n_money 계산
        //     var totalMoney = props.inputMoney; // 수정 필요!!
        //     // var members = phoneValueList;
        //     // var n_money = Math.ceil(totalMoney/members.length);

        //     // db에 insert
        //     const formData = new FormData();
        //     formData.append('groupId', groupId);
        //     formData.append('payContent', inputContent);
        //     formData.append('totalMoney', totalMoney);
        //     formData.append('userId', props.userId);
        //     formData.append('userBank', inputBank);
        //     formData.append('userAccount', inputAccount);
        //     // formData.append('n_money', n_money);

        //     axios({
        //         method: "post",
        //         url: 'http://localhost:8090/createDutchPayGroup',
        //         data: formData
        //     })
        //     .then(function(response){
        //         // console.log("response", response.data);
        //         // props.setResultMembers(response.data);
        //     })
        //     .catch(function(error){
        //         console.log(error);
        //     })
        // }
    };

    const addContentAction = (e) =>{
        console.log("contentBoxes len", contentBoxes.length);
        setContentBoxes([...contentBoxes, {array: <ContentBox/>, content: "", money: "", phones: []}]);
    }

    return(
        <div className='mainRightPart'>
            <div className='goDutchTitleArea'>
                <div className="dutchTitle">정산하기</div>
                <div className='addDutchContent' onClick={addContentAction}>
                    +
                </div>
            </div>
            
            <div className='goDutchRightPart'>
                <div className='dutchInfo'>
                    <span className='dutchSubTitle'>계좌번호</span> &nbsp;
                    {valid 
                        ? <span style={{ color: 'green' }}>Valid Account</span> 
                        : <span style={{ color: 'red' }}>Check your account</span>}
                        
                    <div style={{marginTop: "5px"}}>
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

                        <input className='accountInputBox' value={inputAccount} onChange={checkAccount}></input> 
                    </div>

                    <div className='dutchContentList'>
                        {contentBoxes.map((_, idx) => (
                            <ContentBox
                                key={idx}
                                contentBoxes={contentBoxes}
                                setContentBoxes={setContentBoxes}
                                content_id={idx}
                                // inputMoney={props.inputMoney}
                                // setInputMoney={props.setInputMoney}
                                setInputContent={setInputContent}
                                
                                checkContentBlank={checkContentBlank}
                                setCheckContentBlank={setCheckContentBlank}
                                setCheckMoneyBlank={setCheckMoneyBlank}
                                checkMoneyBlank={checkMoneyBlank}
                            />
                        ))}
                    </div>
                    

                    <div className='dutchPayBtn' onClick={clickDutchPayBtn}>
                        <img src="/images/goDutch.png" className='goDutchImg'/>
                        <div className='dutchPayText'>정산하기</div>
                    </div>
                </div>

                
                    
            </div>
        
        </div> 
    );
}

export default GoDutchRightContent;