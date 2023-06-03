package com.dutchpay.dp.data.handler;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import java.util.List;

public interface GroupsHandler {
    List<GroupsEntity>  getGroupsEntityList(String userId);
    // GroupsDTO getGroupsEntity(String groupId, String members);
}
