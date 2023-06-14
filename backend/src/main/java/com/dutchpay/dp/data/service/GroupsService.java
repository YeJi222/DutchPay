package com.dutchpay.dp.data.service;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import java.util.List;

public interface GroupsService {
    List<GroupsEntity> getGroupsList(String userId);
    String getSameGroupMemberLen(String groupId);
    GroupsDTO saveGroup(String groupId, String contentId, String userId, String userBank, String userAccount,
        String dutchMoney, String payContent, String state);
    GroupsDTO getGroup(String groupId);

    String createGroupId();
}
