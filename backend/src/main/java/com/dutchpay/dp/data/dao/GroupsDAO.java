package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;

public interface GroupsDAO {
    GroupsEntity getGroups(String userId);
}
