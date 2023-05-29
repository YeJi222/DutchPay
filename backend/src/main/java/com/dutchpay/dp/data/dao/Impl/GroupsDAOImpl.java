package com.dutchpay.dp.data.dao.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.repository.GroupsRepository;
import java.util.List;
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
    public GroupsEntity getGroups(String groupId){
        GroupsEntity groupsEntity = groupsRepository.getReferenceById(groupId);
        return groupsEntity;
    }
}
