package com.dutchpay.dp.data.handler.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;
import com.dutchpay.dp.data.handler.GroupsHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GroupsHandlerImpl implements GroupsHandler {
    GroupsDAO groupsDAO;

    @Autowired
    public GroupsHandlerImpl(GroupsDAO groupsDAO){
        this.groupsDAO = groupsDAO;
    }

    @Override
    public GroupsDTO getGroupsEntity(String userId){
        GroupsEntity groupsEntity = groupsDAO.getGroups(userId);
        GroupsDTO groups = new GroupsDTO(groupsEntity.getGroupId(), groupsEntity.getUserId(),
            groupsEntity.getTotalMoney(), groupsEntity.getPayContent(), groupsEntity.getMembers(), groupsEntity.getState());
        return groups;
    }
}
