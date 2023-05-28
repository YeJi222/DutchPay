package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.dto.UserDTO;
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

    @Override
    public UserDTO getUser(String userId){
        return userHandler.getUserEntity(userId);
    }

    @Override
    public UserDTO saveUser(String userId, String userPw, String phone, String bank, String account){
        return userHandler.saveUserEntity(userId, userPw, phone, bank, account);
    }
}
