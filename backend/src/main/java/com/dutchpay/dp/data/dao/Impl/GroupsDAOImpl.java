package com.dutchpay.dp.data.dao.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.repository.GroupsRepository;
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
    public GroupsEntity getGroups(String userId){
        GroupsEntity groupsEntity = groupsRepository.findByUserId(userId);
        return groupsEntity;
    }
}
