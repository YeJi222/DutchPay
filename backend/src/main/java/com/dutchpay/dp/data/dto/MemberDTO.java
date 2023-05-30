package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.MemberEntity;
import jakarta.persistence.Id;
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
public class MemberDTO {
    private String groupId;
    private String phone;
    private String nMoney;
    private String imgData;
    private String sendState;

    public MemberEntity toEntity() {
        return MemberEntity.builder()
            .groupId(groupId)
            .phone(phone)
            .nMoney(nMoney)
            .imgData(imgData)
            .sendState(sendState)
            .build();
    }
}
