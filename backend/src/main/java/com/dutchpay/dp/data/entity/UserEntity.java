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
    @Id
    String userID;
    String userPW;
    String phone;
    String bank;
    String account;

    public UserDTO toDto(){
        return UserDTO.builder()
            .userID(userID)
            .userPW(userPW)
            .phone(phone)
            .bank(bank)
            .account(account)
            .build();
    }
}
