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
    private String userID;
    private String userPW;
    private String phone;
    private String bank;
    private String account;

    public UserEntity toEntity(){
        return UserEntity.builder()
            .userID(userID)
            .userPW(userPW)
            .phone(phone)
            .bank(bank)
            .account(account)
            .build();
    }
}
