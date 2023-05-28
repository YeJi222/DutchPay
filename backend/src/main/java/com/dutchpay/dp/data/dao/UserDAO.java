package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.UserEntity;

public interface UserDAO {
    UserEntity getUser(String phone);
    UserEntity saveUser(UserEntity userEntity);
}
