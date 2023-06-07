import React, { useState, useEffect } from 'react';

function ContentBox(props){
    // const [inputPhone, setInputPhone] = useState();
    console.log(props.contentBoxes);

    const deleteContents = (e) => {
        console.log("delete box key : ", props.content_id);
        console.log(props.deleteContents);

        // 해당 content_id 제외한 배열 새로 만들어서 set
        props.setContentBoxes(prevContentBoxes => prevContentBoxes.filter((_, i) => {
            if(i !== props.content_id){
                console.log(i, props.content_id);
            }
            return i !== props.content_id
        }));
    }

    // const changePhone = (e) => {
    //     const changePhoneBoxes = props.phoneBoxes.map((box, index) => {
    //         if(index === props.phone_id){
    //             console.log("index", index);

    //             // ...box : box의 모든 속성을 새로운 객체에 복사하고, 원하는 속성의 값을 변경할 수 있다
    //             var validValue = e.target.value.replaceAll(/[^0-9]/g, "");
    //             return { ...box, value: validValue }; // 특정 인덱스 요소의 value 변경
    //         }
    //         return box; // 나머지 요소는 그대로 유지
    //     });
    //     props.setPhoneBoxes(changePhoneBoxes); // 변경한 새 배열을 set
    // }

    const changeContent = (e) => {
        console.log(e.target.value);
        props.setInputContent(e.target.value);

        if(e.target.value != ""){
            props.setCheckContentBlank(true);
        } else{
            props.setCheckContentBlank(false);
        }

        const changeContentBoxes = props.contentBoxes.map((box, idx) => {
            if(idx === props.content_id){
                console.log("idx", idx);

                // ...box : box의 모든 속성을 새로운 객체에 복사하고, 원하는 속성의 값을 변경할 수 있다
                return { ...box, content: e.target.value}; // 특정 인덱스 요소의 value 변경
            }
            return box; // 나머지 요소는 그대로 유지
        });
        props.setContentBoxes(changeContentBoxes); // 변경한 새 배열을 set
    };

    const changeMoney = (e) => {
        console.log(e.target.value);
        // props.setInputMoney(e.target.value.replaceAll(/[^0-9]/g, "")); // 숫자형식만 가능

        if(e.target.value != ""){
            props.setCheckMoneyBlank(true);
        } else{
            props.setCheckMoneyBlank(false);
        }

        const changeContentBoxes = props.contentBoxes.map((box, idx) => {
            if(idx === props.content_id){
                console.log("idx", idx);

                // ...box : box의 모든 속성을 새로운 객체에 복사하고, 원하는 속성의 값을 변경할 수 있다
                return { ...box, money: e.target.value.replaceAll(/[^0-9]/g, "")}; // 숫자형식만 가능
            }
            return box; // 나머지 요소는 그대로 유지
        });
        props.setContentBoxes(changeContentBoxes); // 변경한 새 배열을 set
    };

    return(
        // <div className='phoneInputArea'>
        //     <input className='phoneInput' 
        //         onChange={changePhone} 
        //         value={JSON.stringify(props.phoneBoxes[props.phone_id].value).substring(1, JSON.stringify(props.phoneBoxes[props.phone_id].value).length - 1)} // "" 제거
        //         placeholder="'-' 기호 없이 숫자만 입력해주세요">
        //     </input>
        //     <div className='deleteMembers' onClick={deletePhoneNumbers}>
        //         -
        //     </div>
        // </div>

        <div>
            <div className='goDutchTitleArea' style={{marginBottom: "-10px"}}>
                <div className="dutchTitle">정산 {props.content_id + 1}</div>
                <div className='deleteDutchContent' onClick={deleteContents}>
                    delete
                </div>
            </div>

            <div className='dutchSubTitle'>정산할 내용</div>
            <input className='ducthInputBox' id='goDutchContent' 
                onChange={changeContent}
                value={JSON.stringify(props.contentBoxes[props.content_id].content).substring(1, JSON.stringify(props.contentBoxes[props.content_id].content).length - 1)} // "" 제거
                placeHolder={props.checkContentBlank === false ? "정산할 내용을 입력해주세요!" : ""}
            ></input>

            <div className='dutchSubTitle'>정산할 금액</div>
            <input className='ducthInputBox' id='goDutchMoney' 
                onChange={changeMoney} 
                value={JSON.stringify(props.contentBoxes[props.content_id].money).substring(1, JSON.stringify(props.contentBoxes[props.content_id].money).length - 1)} // "" 제거
                placeHolder={props.checkMoneyBlank === false ? "정산할 금액을 입력해주세요!" : ""}
            ></input>
        </div>
    );
}

export default ContentBox;