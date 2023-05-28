package com.dutchpay.dp.data.dao.Impl;

import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.entity.UserEntity;
import com.dutchpay.dp.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDAOImpl implements UserDAO {
    UserRepository userRepository;

    @Autowired
    public UserDAOImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity saveUser(UserEntity userEntity){
        userRepository.save(userEntity);
        return userEntity;
    }
}
