package com.dutchpay.dp.data.service;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import java.util.List;

public interface GroupsService {
    // GroupsDTO getGroups(String groupId, String members);
    List<GroupsEntity> getGroupsList(String userId);
    String getSameGroupMemberLen(String groupId);
    GroupsDTO saveGroup(String groupId, String contentId, String userId, String userBank, String userAccount,
        String totalMoney, String payContent, String state);

    String createGroupId();
}
