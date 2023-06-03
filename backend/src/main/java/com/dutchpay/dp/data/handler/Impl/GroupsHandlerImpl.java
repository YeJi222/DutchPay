package com.dutchpay.dp.data.handler.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;
import com.dutchpay.dp.data.handler.GroupsHandler;
import java.util.List;
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
    public List<GroupsEntity> getGroupsEntityList(String userId){
        List<GroupsEntity> groupsEntityList = groupsDAO.getGroupsEntityList(userId);
        return groupsEntityList;
    }

//    @Override
//    public GroupsDTO getGroupsEntity(String groupId){
//        GroupsEntity groupsEntity = groupsDAO.getGroups(groupId);
//        GroupsDTO groups = new GroupsDTO(groupsEntity.getGroupId(), groupsEntity.getUserId(),
//            groupsEntity.getUserBank(), groupsEntity.getUserAccount(),
//            groupsEntity.getTotalMoney(), groupsEntity.getPayContent(),
//            groupsEntity.getMembers(), groupsEntity.getState());
//        return groups;
//    }
}
