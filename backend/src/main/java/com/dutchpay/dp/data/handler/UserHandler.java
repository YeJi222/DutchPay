package com.dutchpay.dp.data.handler;

import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.dto.UserDTO;

public interface UserHandler {
    UserDTO getUserEntity(String phone);
    UserDTO saveUserEntity(String userId, String userPw, String phone, String bank, String account);
}
