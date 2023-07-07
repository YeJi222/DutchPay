package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;
import java.util.List;

public interface GroupsDAO {
    List<GroupsEntity> getGroupsEntityList(String userId);
    List<GroupsEntity> getContentsEntityList(String groupId);
    List<GroupsEntity> getSameGroupIdList(String groupId);
    GroupsEntity saveGroup(GroupsEntity groupEntity);
    GroupsEntity getGroups(String groupId);
    List<String> getGroupIdAll();
    int updateGroupState(String groupId, String stateValue);
}
