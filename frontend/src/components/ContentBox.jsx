import React, { useState, useEffect } from 'react';

function ContentBox(props){
    // const [inputPhone, setInputPhone] = useState();
    const selectAllName = `selectAll_${props.content_id}`;
    const checkboxName = `phoneNumbers_${props.content_id}`;
    // console.log(props.contentBoxes);

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

        props.setCheckContentBlank(prevContentBlank => prevContentBlank.filter((_, i) => {
            return i !== props.content_id
        }));

        props.setCheckMoneyBlank(prevContentBlank => prevContentBlank.filter((_, i) => {
            return i !== props.content_id
        }));
    }

    const changeContent = (e) => {
        console.log(e.target.value);
        props.setInputContent(e.target.value);

        const trueCheckContentBlank = props.checkContentBlank.map((box, idx) => {
            if(idx === props.content_id){
                console.log("checkContentBlank idx", idx);

                return true; // 특정 인덱스 요소의 value를 변경
            }
            return box; // 나머지 요소는 그대로 유지
        });
        const falseCheckContentBlank = props.checkContentBlank.map((box, idx) => {
            if(idx === props.content_id){
                console.log("checkContentBlank idx", idx);

                return false; // 특정 인덱스 요소의 value를 변경
            }
            return box; // 나머지 요소는 그대로 유지
        });

        if(e.target.value != ""){
            props.setCheckContentBlank(trueCheckContentBlank);
        } else{
            props.setCheckContentBlank(falseCheckContentBlank);
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
        console.log("money", e.target.value);

        const trueCheckMoneyBlank = props.checkMoneyBlank.map((box, idx) => {
            if(idx === props.content_id){
                return true; // 특정 인덱스 요소의 value를 변경
            }
            return box; // 나머지 요소는 그대로 유지
        });
        const falseCheckMoneyBlank = props.checkMoneyBlank.map((box, idx) => {
            if(idx === props.content_id){
                return false; // 특정 인덱스 요소의 value를 변경
            }
            return box; // 나머지 요소는 그대로 유지
        });

        if(e.target.value != ""){
            props.setCheckMoneyBlank(trueCheckMoneyBlank);
        } else{
            props.setCheckMoneyBlank(falseCheckMoneyBlank);
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
        // console.log(selectedList);

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
    // console.log("selectedList", props.contentBoxes);

    const clickSelectPhones = (e) => {
        console.log(e.target.className);
        if(e.target.className === "selectPhones"){
            e.target.className = "selectPhonesOpen";
        } else{
            e.target.className = "selectPhones";
        }
        
        // var area = document.getElementById('selectPhonesArea');
        // area.style.backgroundColor = "yellow";
        // area.style.color
    }

    return(
        props.memberInfo != undefined ? (
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
                    placeHolder={props.checkContentBlank[props.content_id] === false ? "정산할 내용을 입력해주세요!" : ""}
                ></input>

                <div className='dutchSubTitle'>정산할 금액</div>
                <input className='ducthInputBox' id='goDutchMoney' 
                    onChange={changeMoney} 
                    value={JSON.stringify(props.contentBoxes[props.content_id].money).substring(1, JSON.stringify(props.contentBoxes[props.content_id].money).length - 1)} // "" 제거
                    placeHolder={props.checkMoneyBlank[props.content_id] === false ? "정산할 금액을 입력해주세요!" : ""}
                ></input>

                <div className='dutchSubTitle'>정산할 인원 선택</div>
                <div className="selectPhones" style={{marginTop: "5px"}} onClick={clickSelectPhones} id="selectPhonesArea">
                    정산할 전화번호를 선택하세요 <br/>
                    <input type='checkbox'
                        name={checkboxName}
                        value='selectall'
                        id={selectAllName}
                        onChange={selectAll}
                    /> Select All
                    <br />
                    {
                        props.memberInfo.membersPhone.map((item, idx) => (
                            // <React.Fragment> : React에서 여러 요소를 하나의 부모 요소로 그룹화하기 위해 
                            // 사용되는 특수한 컴포넌트(고유한 key 필요)
                            <React.Fragment key={idx}> 
                                <input
                                    type='checkbox'
                                    name={checkboxName}
                                    value={item}
                                    onChange={checkAction}
                                /> {item}
                                <br/>
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        ) : (
            <div></div>
        )
    );
}

export default ContentBox;