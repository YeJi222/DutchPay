package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
import com.dutchpay.dp.data.entity.compositeKey.MembersPK;
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
public class MembersDTO {
    private String groupId;
    private String phone;
    private String nMoney;
    private String sendState;

    public MembersEntity toEntity(){
        MembersPK pk = MembersPK.builder()
            .groupId(groupId)
            .phone(phone)
            .build();

        return MembersEntity.builder()
            .compositeKey(pk)
            .nMoney(nMoney)
            .sendState(sendState)
            .build();
    }
}
