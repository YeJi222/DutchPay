package com.dutchpay.dp.data.dao.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.UserEntity;
import com.dutchpay.dp.data.repository.GroupsRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupsDAOImpl implements GroupsDAO {
    GroupsRepository groupsRepository;

    @Autowired
    public GroupsDAOImpl(GroupsRepository groupsRepository){
        this.groupsRepository = groupsRepository;
    }

    @Override
    public List<GroupsEntity> getGroupsEntityList(String userId){
        List<GroupsEntity> groupsEntityList = groupsRepository.findByUserId(userId);
        return groupsEntityList;
    }

    @Override
    public List<GroupsEntity> getContentsEntityList(String groupId){
        List<GroupsEntity> groupsEntityList = groupsRepository.findByCompositeKeyGroupId(groupId);
        return groupsEntityList;
    }

    @Override
    public List<GroupsEntity> getSameGroupIdList(String groupId){
        List<GroupsEntity> groupsEntityList = groupsRepository.findByCompositeKeyGroupId(groupId);
        return groupsEntityList;
    }

    @Override
    public GroupsEntity saveGroup(GroupsEntity groupEntity){
        groupsRepository.save(groupEntity);
        return groupEntity;
    }

    @Override
    public GroupsEntity getGroups(String groupId){
        List<GroupsEntity> groupsEntity = groupsRepository.findByCompositeKeyGroupId(groupId);
        GroupsEntity groupEntity = groupsEntity.get(0);
        return groupEntity;
    }

    @Override
    public List<String> getGroupIdAll(){
        List<String> distinctGroupIdList = groupsRepository.findDistinctGroupId();

        return distinctGroupIdList;
    }

    @Override
    public int updateGroupState(String groupId, String stateValue){
        int result = groupsRepository.updateGroupState(groupId, stateValue);
        return result;
    }
}
