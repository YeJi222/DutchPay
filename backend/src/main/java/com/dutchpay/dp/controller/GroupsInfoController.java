package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.MembersService;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class GroupsInfoController {
    private MembersService membersService;
    private GroupsService groupsService;
    @Autowired
    public GroupsInfoController(GroupsService groupsService, MembersService membersService){
        this.groupsService = groupsService;
        this.membersService = membersService;
    }

    @PostMapping(value = "/getGroupUserInfo")
    public HashMap<String, Object> getUserInfo(@RequestParam("sessionUserId") String userId, @RequestParam("groupId") String groupId) {
        HashMap<String, Object> map = new HashMap<>();
        GroupsDTO groupInfo = groupsService.getGroup(groupId);

        // timestamp
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일");
        String timestamp = simpleDateFormat.format(groupInfo.getTimestamp());

        // dutch money(toatl money 계산)
        List<GroupsEntity> groupList =  groupsService.getContentsList(groupId);
        int totalMoney = 0;

        List<HashMap<String, Object>> contentList = new ArrayList<>();
        for(int i = 0 ; i < groupList.size() ; i++){
            int dutchMoney = Integer.parseInt(groupList.get(i).getDutchMoney());
            totalMoney += dutchMoney;

            HashMap<String, Object> contentMap = new HashMap<>();
            contentMap.put("content", groupList.get(i).getPayContent());
            contentMap.put("dutchMoney", groupList.get(i).getDutchMoney());
            contentList.add(contentMap);
        }
        // System.out.println("content-money : " + contentList);

        // 멤버별 확인
        List<MembersEntity> memberList = membersService.getMembersList(groupId);
        ArrayList<MembersEntity> membersInfo = new ArrayList<>();
        for(int i = 0 ; i < memberList.size() ; i++){
            membersInfo.add(memberList.get(i));
        }
        // System.out.println("member : " + membersInfo);

        map.put("userId", groupInfo.getUserId());
        map.put("userBank", groupInfo.getUserBank());
        map.put("userAccount", groupInfo.getUserAccount());
        map.put("timestamp", timestamp);
        map.put("totalMoney", totalMoney);
        map.put("membersInfo", membersInfo);
        map.put("contentList", contentList);

        // System.out.println("group Info : " + map);

        return map;
    }

    @PostMapping(value = "/changeState")
    public String changeState(@RequestParam("groupId") String groupId,
        @RequestParam("phone") String phone, @RequestParam("state") String state) {
        HashMap<String, Object> map = new HashMap<>();
        String changeState = "";
        if(state.equals("redBtn")){
            changeState = "yes";
        } else{
            changeState = "no";
        }
        int result = membersService.updateState(groupId, phone, changeState);

        // System.out.println("state : " + state);

        return "success to update state";
    }

    @PostMapping(value = "/changeGroupState")
    public String changeGroupState(@RequestParam("groupId") String groupId) {
        HashMap<String, Object> map = new HashMap<>();
        System.out.println("groupId : " + groupId);

//        String changeState = "";
//        if(state.equals("redBtn")){
//            changeState = "yes";
//        } else{
//            changeState = "no";
//        }
//        int result = membersService.updateState(groupId, phone, changeState);
//
//        System.out.println("state : " + state);

        return "success to update state";
    }
}
