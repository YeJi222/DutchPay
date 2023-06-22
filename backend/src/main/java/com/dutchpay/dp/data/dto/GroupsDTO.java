package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
import java.sql.Timestamp;
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
    private String contentId;
    private String userId;
    private String userBank;
    private String userAccount;
    private String dutchMoney;
    private String payContent;
    private String state;
    private Timestamp timestamp;

    public GroupsEntity toEntity(){
        GroupsPK pk = GroupsPK.builder()
            .groupId(groupId)
            .contentId(contentId)
            .build();

        return GroupsEntity.builder()
            .compositeKey(pk)
            .userId(userId)
            .userBank(userBank)
            .userAccount(userAccount)
            .dutchMoney(dutchMoney)
            .payContent(payContent)
            .state(state)
            .timestamp(timestamp)
            .build();
    }
}
