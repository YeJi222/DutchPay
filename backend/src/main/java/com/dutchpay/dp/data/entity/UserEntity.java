package com.dutchpay.dp.data.entity;

import com.dutchpay.dp.data.dto.UserDTO;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "User")
public class UserEntity {
    String userId;
    String userPw;
    @Id
    String phone;
    String bank;
    String account;

    public UserDTO toDto(){
        return UserDTO.builder()
            .userId(userId)
            .userPw(userPw)
            .phone(phone)
            .bank(bank)
            .account(account)
            .build();
    }
}
