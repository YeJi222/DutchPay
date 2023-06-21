package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.ContentsEntity;

public interface ContentsDAO {
    ContentsEntity saveContents(ContentsEntity contentsEntity);
    // ContentsEntity getContents(String groupId);
}
