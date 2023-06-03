import React, { useState, useEffect } from 'react';

function PhoneBox(props){
    // const [inputPhone, setInputPhone] = useState();

    const deletePhoneNumbers = (e) => {
        console.log("delete box key : ", props.phone_id);
        console.log(props.phoneBoxes);

        // 해당 phone_id 제외한 배열 새로 만들어서 set
        props.setPhoneBoxes(prevPhoneBoxes => prevPhoneBoxes.filter((_, i) => i !== props.phone_id));
    }

    const changePhone = (e) => {
        const changePhoneBoxes = props.phoneBoxes.map((box, index) => {
            if(index === props.phone_id){
                console.log("index", index);

                // ...box : box의 모든 속성을 새로운 객체에 복사하고, 원하는 속성의 값을 변경할 수 있다
                var validValue = e.target.value.replaceAll(/[^0-9]/g, "");
                return { ...box, value: validValue }; // 특정 인덱스 요소의 value 변경
            }
            return box; // 나머지 요소는 그대로 유지
        });
        props.setPhoneBoxes(changePhoneBoxes); // 변경한 새 배열을 set
    }

    return(
        <div className='phoneInputArea'>
            <input className='phoneInput' 
                onChange={changePhone} 
                value={JSON.stringify(props.phoneBoxes[props.phone_id].value).substring(1, JSON.stringify(props.phoneBoxes[props.phone_id].value).length - 1)} // "" 제거
                placeholder="'-' 기호 없이 숫자만 입력해주세요">
            </input>
            <div className='deleteMembers' onClick={deletePhoneNumbers}>
                -
            </div>
        </div>
    );
}

export default PhoneBox;