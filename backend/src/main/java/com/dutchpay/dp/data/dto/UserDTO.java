package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserDTO {
    private String userId;
    private String userPw;
    private String phone;
    private String bank;
    private String account;

    public UserEntity toEntity(){
        return UserEntity.builder()
            .userId(userId)
            .userPw(userPw)
            .phone(phone)
            .bank(bank)
            .account(account)
            .build();
    }
}
