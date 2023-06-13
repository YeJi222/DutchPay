package com.dutchpay.dp.data.entity;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
import jakarta.persistence.EmbeddedId;
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
@Table(name = "Groups")
public class GroupsEntity {
    @EmbeddedId
    GroupsPK compositeKey;
    String userId;
    String userBank;
    String userAccount;
    String dutchMoney;
    String payContent;
    String state;

    public GroupsDTO toDto(){
        return GroupsDTO.builder()
            .groupId(compositeKey.getGroupId())
            .userId(userId)
            .userBank(userBank)
            .userAccount(userAccount)
            .totalMoney(dutchMoney)
            .payContent(payContent)
            .contentId(compositeKey.getContentId())
            .state(state)
            .build();
    }
}
