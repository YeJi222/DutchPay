package com.dutchpay.dp.data.entity;

import com.dutchpay.dp.data.dto.MemberDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
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
@Table(name = "Members")
public class MemberEntity {
    @Id
    String groupId;
    @Id
    String phone;
    String nMoney;
    String imgData;
    String sendState;

    public MemberDTO toDto(){
        return MemberDTO.builder()
            .groupId(groupId)
            .phone(phone)
            .nMoney(nMoney)
            .imgData(imgData)
            .sendState(sendState)
            .build();
    }
}
