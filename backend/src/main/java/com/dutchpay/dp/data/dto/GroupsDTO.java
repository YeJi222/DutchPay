package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
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
public class GroupsDTO {
    private String groupId;
    private String members;
    private String userId;
    private String userBank;
    private String userAccount;
    private String totalMoney;
    private String payContent;
    private String state;

    public GroupsEntity toEntity(){
        GroupsPK pk = GroupsPK.builder()
            .groupId(groupId)
            .members(members)
            .build();

        return GroupsEntity.builder()
            .compositeKey(pk)
            .userId(userId)
            .userBank(userBank)
            .userAccount(userAccount)
            .totalMoney(totalMoney)
            .payContent(payContent)
            .state(state)
            .build();
    }
}
