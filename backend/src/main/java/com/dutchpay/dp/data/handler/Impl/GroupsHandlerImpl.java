package com.dutchpay.dp.data.handler.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.dao.UserDAO;
import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
import com.dutchpay.dp.data.handler.GroupsHandler;
import java.sql.Timestamp;
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

    @Override
    public List<GroupsEntity> getSameGroupIdList(String groupId){
        List<GroupsEntity> groupsEntityList = groupsDAO.getSameGroupIdList(groupId);
        return groupsEntityList;
    }

    @Override
    public GroupsDTO saveGroupEntity(String groupId, String members, String userId, String userBank,
        String userAccount, String dutchMoney, String payContent, String state, Timestamp timestamp){
        GroupsPK compositeKey = new GroupsPK(groupId, members);
        GroupsEntity groupEntity = new GroupsEntity(compositeKey, userId, userBank, userAccount, dutchMoney, payContent, state, timestamp);
        groupEntity = groupsDAO.saveGroup(groupEntity);
        GroupsDTO group = new GroupsDTO(groupEntity.getCompositeKey().getGroupId(), groupEntity.getCompositeKey().getContentId(),
            groupEntity.getUserId(), groupEntity.getUserBank(), groupEntity.getUserAccount(), groupEntity.getDutchMoney(),
            groupEntity.getPayContent(), groupEntity.getState(), groupEntity.getTimestamp());

        return group;
    }

    @Override
    public GroupsDTO getGroupEntity(String groupId){
        GroupsEntity groupEntity = groupsDAO.getGroups(groupId);
        GroupsDTO group = new GroupsDTO(groupEntity.getCompositeKey().getGroupId(), groupEntity.getCompositeKey().getContentId(),
            groupEntity.getUserId(), groupEntity.getUserBank(), groupEntity.getUserAccount(), groupEntity.getDutchMoney(),
            groupEntity.getPayContent(), groupEntity.getState(), groupEntity.getTimestamp());
        return group;
    }

    @Override
    public List<String> getGroupIdAll(){
        return groupsDAO.getGroupIdAll();
    }
}
