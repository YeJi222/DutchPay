import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';

function GoDutchLeftContent(props){
    // const [phoneBoxes, setPhoneBoxes] = useState([{array: <PhoneBox phone_id="0"/>, value: ""}]);
    const phoneBoxes = props.phoneBoxes;
    const setPhoneBoxes = props.setPhoneBoxes;
    
    console.log("phoneBoxes", phoneBoxes);
    const addPhoneNumbers = (e) => {
        console.log("phoneBoxes len", phoneBoxes.length);
        setPhoneBoxes([...phoneBoxes, {array: <PhoneBox/>, value: ""}]);
    }

    const clickNextBtn = (e) => {
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
            console.log("clickNextBtn", JSON.stringify(box.value).length);
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
            if(phoneFormatCheck === true){
                props.setInsertPhones(true);
                var members = phoneValueList;

                // db에 insert
                const formData = new FormData();
                formData.append('groupId', props.groupId);
                formData.append('members', members);

                axios({
                    method: "post",
                    url: 'http://localhost:8090/createMembers',
                    data: formData
                })
                .then(function(response){
                    // console.log("response", response.data);
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }

    return(
        <div className='goDutchLeftPart'>
            <div className='mainLeftTopText'>
                정산할 인원
            </div>
            <div className='addMembers' onClick={addPhoneNumbers}>
                +
            </div>
            <div className='nextBtn' onClick={clickNextBtn}>
                Next {'>'}
            </div>
            <hr className='goDutchHr'></hr>
            <p className='explainText'>정산할 인원만큼 '+'버튼을 눌러 전화번호 입력란을 추가하세요. 
                전화번호는 '-' 기호 없이 숫자만 입력해주세요.
            </p>

            <div className='phoneInfoArea'>
                {phoneBoxes.map((_, index) => (
                    <PhoneBox
                        key={index}
                        phoneBoxes={phoneBoxes}
                        setPhoneBoxes={setPhoneBoxes}
                        phone_id={index}
                    />
                ))}
            </div>

            <div className='goDutchLeftBottomText'>
                총 인원 : {phoneBoxes.length}명<br></br>
                정산 금액 : {props.inputMoney}원
                
            </div>
        </div>    
    );
}

export default GoDutchLeftContent;