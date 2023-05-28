package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.UserEntity;

public interface UserDAO {

    UserEntity saveUser(UserEntity userEntity);
}
