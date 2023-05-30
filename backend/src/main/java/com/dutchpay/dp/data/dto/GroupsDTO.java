package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.GroupsEntity;
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
    private String userId;
    private String totalMoney;
    private String payContent;
    private String members;
    private String state;

    public GroupsEntity toEntity(){
        return GroupsEntity.builder()
            .groupId(groupId)
            .userId(userId)
            .totalMoney(totalMoney)
            .payContent(payContent)
            .members(members)
            .state(state)
            .build();
    }
}
