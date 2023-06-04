package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;
import java.util.List;

public interface GroupsDAO {
    List<GroupsEntity> getGroupsEntityList(String userId);
    GroupsEntity saveGroup(GroupsEntity groupEntity);
    // GroupsEntity getGroups(String groupId, String members);
    List<String> getGroupIdAll();
}
