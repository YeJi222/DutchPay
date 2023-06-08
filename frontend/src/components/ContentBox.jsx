import React, { useState, useEffect } from 'react';

function ContentBox(props){
    // const [inputPhone, setInputPhone] = useState();
    const selectAllName = `selectAll_${props.content_id}`;
    const checkboxName = `phoneNumbers_${props.content_id}`;
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

    const selectAll = (e) => {
        // console.log("e", e.name);
        console.log("name", e.target.name);
        console.log("id", e.target.id);
        const selectAllBox = document.getElementById(e.target.id);
        const checkboxes = document.getElementsByName(e.target.name);
        const selectedList = [];

        

        checkboxes.forEach((checkbox) => {
            // console.log("test", checkbox.value);
            checkbox.checked = selectAllBox.checked;
            if(checkbox.checked && checkbox.value != "selectall"){
                selectedList.push(checkbox.value);
            }
        })
        console.log(selectedList);

        const changeContentBoxes = props.contentBoxes.map((box, idx) => {
            if(idx === props.content_id){
                console.log("idx", idx);

                // ...box : box의 모든 속성을 새로운 객체에 복사하고, 원하는 속성의 값을 변경할 수 있다
                return { ...box, phones: selectedList};
            }
            return box; // 나머지 요소는 그대로 유지
        });
        props.setContentBoxes(changeContentBoxes); // 변경한 새 배열을 set
    }

    const checkAction = (e) => {
        console.log("name", e.target.name);
        console.log("id", e.target.id);
        const selectAllBox = document.getElementById(e.target.id);
        const checkboxes = document.getElementsByName(e.target.name);
        const selectedList = [];

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked && checkbox.value != "selectall"){
                selectedList.push(checkbox.value);
            }
        })
        if(selectedList.length != 3){
            console.log(checkboxes[0].checked = false);
        } else{
            checkboxes[0].checked = true;
        }
        console.log("selectedList", selectedList);

        const changeContentBoxes = props.contentBoxes.map((box, idx) => {
            if(idx === props.content_id){
                console.log("idx", idx);

                // ...box : box의 모든 속성을 새로운 객체에 복사하고, 원하는 속성의 값을 변경할 수 있다
                return { ...box, phones: selectedList};
            }
            return box; // 나머지 요소는 그대로 유지
        });
        props.setContentBoxes(changeContentBoxes); // 변경한 새 배열을 set
    }

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

            <div className='dutchSubTitle'>정산할 인원 선택</div>
            {/* <div style={{marginTop: "5px"}}>
                <select multiple="multiple" id="selectPeople" class="selectBank">
                    <option value="국민">국민</option>
                    <option value="하나">하나</option>
                    <option value="농협">농협</option>
                    <option value="우리">우리</option>
                    <option value="신한">신한</option>
                    <option value="부산">부산</option>
                    <option value="카카오뱅크">카카오뱅크</option>
                    <option value="기타">기타</option>
                </select>
            </div> */}

            <div class="selectBank" style={{marginTop: "5px"}}>
                <input type='checkbox'
                    name={checkboxName}
                    value='selectall'
                    id={selectAllName}
                    onChange={selectAll}
                /> <b>Select All</b>
                <br />
                <input type='checkbox'
                    name={checkboxName}
                    value='010-1111-1111'
                    onChange={checkAction}
                /> 010-1111-1111
                <br />
                <input type='checkbox' 
                    name={checkboxName}
                    value='010-2222-2222' 
                    onChange={checkAction}
                /> 010-2222-2222
                <br />
                <input type='checkbox' 
                    name={checkboxName}
                    value='010-3333-3333'
                    onChange={checkAction}
                /> 010-3333-3333
            </div>
                
            
            

            {/* <form id="myForm" action="/submit" method="post">
                <div class="dropdown">
                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    체크박스 선택
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <label class="dropdown-item">
                        <input type="checkbox" name="option" value="option1"> 옵션 1</input>
                    </label>
                    <label class="dropdown-item">
                        <input type="checkbox" name="option" value="option2"> 옵션 2</input>
                    </label>
                    <label class="dropdown-item">
                        <input type="checkbox" name="option" value="option3"> 옵션 3</input>
                    </label>
                    </div>
                </div>
                <button type="submit">전송</button>
            </form> */}
        </div>
    );
}

export default ContentBox;