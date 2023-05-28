package com.dutchpay.dp.data.service;

import com.dutchpay.dp.data.dto.UserDTO;

public interface UserService {
    UserDTO getUser(String phone);
    UserDTO saveUser(String userId, String userPw, String phone, String bank, String account);
}
