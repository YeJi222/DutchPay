package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.handler.GroupsHandler;
import com.dutchpay.dp.data.service.GroupsService;
import java.sql.Timestamp;
import java.util.List;
import java.util.Random;
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
    public List<GroupsEntity> getContentsList(String groupId){
        return groupsHandler.getContentsEntityList(groupId);
    }

    @Override
    public GroupsDTO saveGroup(String groupId, String contentId, String userId, String userBank,
        String userAccount, String dutchMoney, String payContent, String state, Timestamp timestamp){
        return groupsHandler.saveGroupEntity(groupId, contentId, userId, userBank, userAccount, dutchMoney, payContent, state, timestamp);
    }

    @Override
    public GroupsDTO getGroup(String groupId){
        return groupsHandler.getGroupEntity(groupId);
    }

    @Override
    public String createGroupId(){ // random한 groupId 생성
        int tempRandomGroupId = 0;
        String randomGroupIdStr = "";
        List<String> groupIdList = groupsHandler.getGroupIdAll();
        // System.out.println("groupIdList : " + groupIdList);

        int min = 100000, max = 999999;
        Random random = new Random();
        random.setSeed(System.nanoTime()); // 현재 시간을 기반으로 난수 시퀀스 생성

        while(true){
            tempRandomGroupId = random.nextInt((max - min) + min); // min ~ max
            randomGroupIdStr = Integer.toString(tempRandomGroupId);
            if(!groupIdList.contains(randomGroupIdStr)){ // groupIdList에 새로 생성된 random값이 없으면
                groupIdList.add(randomGroupIdStr);
                break;
            }
        }

        return randomGroupIdStr;
    }

    @Override
    public String getSameGroupContentsLen(String groupId) {
        List<GroupsEntity> groupsEntityList = groupsHandler.getSameGroupIdList(groupId);
        // System.out.println("groupsEntityList size : " + groupsEntityList.size());

        return Integer.toString(groupsEntityList.size());
    }

    @Override
    public int updateGroupState(String groupId, String stateValue){
        return groupsHandler.updateGroupState(groupId, stateValue);
    }
}
