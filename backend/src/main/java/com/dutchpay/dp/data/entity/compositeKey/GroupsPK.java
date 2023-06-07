package com.dutchpay.dp.data.entity.compositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
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
public class GroupsPK implements Serializable {
    @Column(name = "group_id")
    String groupId;
    @Column(name = "content_id")
    String contentId;

    public String getGroupId() {
        return groupId;
    }

    public String getContentId() {
        return contentId;
    }
}
