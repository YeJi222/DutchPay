package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.handler.GroupsHandler;
import com.dutchpay.dp.data.service.GroupsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupsServiceImpl implements GroupsService {
    GroupsHandler groupsHandler;

    @Autowired
    public GroupsServiceImpl(GroupsHandler groupsHandler){
        this.groupsHandler = groupsHandler;
    }

    @Override
    public GroupsDTO getGroups(String userId){
        return groupsHandler.getGroupsEntity(userId);
    }
}
