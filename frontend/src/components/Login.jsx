import React from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

function Login(){
    return(
        <div className='page'>
            <header>
                <img src="/images/logo.png" className='logoImg'/>
                <span className='title'>Dutch Pay</span>
            </header>

            <div className='centerWrapper'>
                <LeftContent
                    topText="Welcome :)"
                    bottomText="This Web is Dutch Pay Service.
                    Please log in before using this service."
                />
                <RightContent
                    mainTitle="Log In"
                />
            </div>
        </div>
    )
}

export default Login;