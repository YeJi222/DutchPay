package com.dutchpay.dp.data.handler.Impl;

import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.UserEntity;
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

    @Override
    public UserDTO saveUserEntity(String userId, String userPw, String phone, String bank, String account){
        UserEntity userEntity = new UserEntity(userId, userPw, phone, bank, account);
        userEntity = userDAO.saveUser(userEntity);
        UserDTO user = new UserDTO(userEntity.getUserId(), userEntity.getUserPw(), userEntity.getPhone(), userEntity.getBank(), userEntity.getAccount());

        return user;
    }
}
