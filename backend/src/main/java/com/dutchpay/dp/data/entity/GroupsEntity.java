package com.dutchpay.dp.data.entity;

import com.dutchpay.dp.data.dto.GroupsDTO;
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
    @Id
    String groupId;
    String userId;
    String totalMoney;
    String payContent;
    String members;

    public GroupsDTO toDto(){
        return GroupsDTO.builder()
            .groupId(groupId)
            .userId(userId)
            .totalMoney(totalMoney)
            .payContent(payContent)
            .members(members)
            .build();
    }
}
