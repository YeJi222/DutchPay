package com.dutchpay.dp.data.handler;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;

public interface GroupsHandler {
    GroupsDTO getGroupsEntity(String userId);
}
