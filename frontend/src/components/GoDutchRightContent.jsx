import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function GoDutchRightContent(props){    
    const [accountIBAN, setAccountIBAN] = useState(props.userInfo.account);
    const [valid, setValid] = useState(false);
    // console.log(accountIBAN);

    const checkAccount = (e) => {
        const inputAccount = e.target.value;
        setAccountIBAN(inputAccount);
        const formData = new FormData();
        formData.append('inputAccount', inputAccount);

        axios({
            method: "post",
            url: 'http://localhost:8090/checkValidAccount',
            data: formData
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    };

    return(
        <div className='mainRightPart'>
            <div className="dutchTitle">정산하기</div>
            
            <div className='dutchSubTitle'>정산할 내용</div>
            <input className='ducthInputBox'></input>
            <div className='dutchSubTitle'>정산할 금액</div>
            <input className='ducthInputBox'></input>
            <div className='dutchSubTitle'>내 계좌 은행</div>
            <input className='ducthInputBox'></input>
            <div className='dutchSubTitle'>계좌번호</div>
            <input className='ducthInputBox' value={accountIBAN} onChange={checkAccount}></input>

            {valid ? <span style={{ color: 'green' }}>Valid IBAN</span> : <span style={{ color: 'red' }}>Invalid IBAN</span>}
        </div> 
    );
}

export default GoDutchRightContent;