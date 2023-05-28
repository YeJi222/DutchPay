import React from 'react';

function inputBox({inputTitle, boxTitleText, placeholder, isToggled, inputValue, boxName, setFunc, confirmInput}){
    return(
        <div>
            <p className='inputTitle' style={{ color: isToggled === "login" ? "#FFF6F6" : "#E3EAFF" }}>{inputTitle}</p>
            {boxName === "phone" || boxName === "bank" || boxName === "account" ? (
                    <div className='inputBox' style={{ backgroundColor: "#E3EAFF" }}>
                        <input className='inputTotal' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#E3EAFF" }}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setFunc(e.target.value)}
                            type={boxName === "phone" || boxName === "account" ? "number" : "text"}
                        >
                        </input>
                    </div>
                ) : (
                    <div className='inputBox' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}>
                        <div className='boxTitle'>
                            <p className='boxTitleText'>{boxTitleText}</p>
                        </div>
                        <input className='input' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setFunc(e.target.value)}
                            type={boxName === "pw" ? "password" : "text"}
                        >
                        </input>
                    </div>
                )}
            
            <div className='errorMessage' style={{display: confirmInput === "yes" ? "none" : "block" }}>
            Please fill {inputTitle} in the blanks.
            </div>
        </div>
    );
}

export default inputBox;