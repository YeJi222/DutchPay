package com.dutchpay.dp.data.dto;

import com.dutchpay.dp.data.entity.ContentsEntity;
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
public class ContentsDTO {
    private String groupId;
    private String contents;

    public ContentsEntity toEntity(){
        return ContentsEntity.builder()
            .groupId(groupId)
            .contents(contents)
            .build();
    }
}
