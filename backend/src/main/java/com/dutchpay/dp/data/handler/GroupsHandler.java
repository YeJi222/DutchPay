package com.dutchpay.dp.data.handler;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import java.sql.Timestamp;
import java.util.List;

public interface GroupsHandler {
    List<GroupsEntity>  getGroupsEntityList(String userId);
    List<GroupsEntity> getSameGroupIdList(String groupId);
    GroupsDTO saveGroupEntity(String groupId, String contentId, String userId, String userBank,
        String userAccount, String dutchMoney, String payContent, String state, Timestamp timestamp);
     GroupsDTO getGroupEntity(String groupId);
    List<String> getGroupIdAll();
}
