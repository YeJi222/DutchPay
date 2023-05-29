package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.handler.GroupsHandler;
import com.dutchpay.dp.data.service.GroupsService;
import java.util.List;
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
    public List<GroupsEntity> getGroupsList(String userId){
        return groupsHandler.getGroupsEntityList(userId);
    }

    @Override
    public GroupsDTO getGroups(String groupId){
        return groupsHandler.getGroupsEntity(groupId);
    }
}
