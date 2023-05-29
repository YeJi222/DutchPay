package com.dutchpay.dp.data.service;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import java.util.List;

public interface GroupsService {
    GroupsDTO getGroups(String groupId);
    List<GroupsEntity> getGroupsList(String userId);
}
