package com.dutchpay.dp.data.handler.Impl;

import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.handler.UserHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional          
public class UserHandlerImpl implements UserHandler {
    UserDAO userDAO;

    @Autowired
    public UserHandlerImpl(UserDAO userDAO){
        this.userDAO = userDAO;
    }
}
