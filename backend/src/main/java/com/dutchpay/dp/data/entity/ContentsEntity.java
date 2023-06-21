package com.dutchpay.dp.data.entity;

import com.dutchpay.dp.data.dto.ContentsDTO;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import jakarta.persistence.Entity;
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
@Table(name = "Contents")
public class ContentsEntity {
    @Id
    String groupId;
    String contents;

    public ContentsDTO toDto(){
        return ContentsDTO.builder()
            .groupId(groupId)
            .contents(contents)
            .build();
    }
}
