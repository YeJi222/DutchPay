package com.dutchpay.dp.data.entity.compositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MembersPK implements Serializable {
//    @ManyToOne // N : 1
//    @JoinColumn(name = "group_id")
//    @JoinColumn(name = "group_id", referencedColumnName = "group_id") // 외래 키 정의
    @Column(name = "group_id")
    String groupId;
    @Column(name = "phone")
    String phone;

    public String getGroupId() {
        return groupId;
    }

    public String getPhone() {
        return phone;
    }
}
