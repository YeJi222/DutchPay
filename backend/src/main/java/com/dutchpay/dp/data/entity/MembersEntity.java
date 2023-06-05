package com.dutchpay.dp.data.entity;

import com.dutchpay.dp.data.dto.MembersDTO;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
import com.dutchpay.dp.data.entity.compositeKey.MembersPK;
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
@Table(name = "Members")
public class MembersEntity {
    @EmbeddedId
    MembersPK compositeKey;
    String nMoney;
    String sendState;

    public MembersDTO toDto(){
        return MembersDTO.builder()
            .groupId(compositeKey.getGroupId())
            .phone(compositeKey.getPhone())
            .nMoney(nMoney)
            .sendState(sendState)
            .build();
    }
}
