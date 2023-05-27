package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.handler.UserHandler;
import com.dutchpay.dp.data.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    UserHandler userHandler;

    @Autowired
    public UserServiceImpl(UserHandler userHandler){
        this.userHandler = userHandler;
    }

}
