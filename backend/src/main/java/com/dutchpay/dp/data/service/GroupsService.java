package com.dutchpay.dp.data.service;

import com.dutchpay.dp.data.dto.GroupsDTO;

public interface GroupsService {
    GroupsDTO getGroups(String userId);
}
