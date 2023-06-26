package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.MembersService;
import com.dutchpay.dp.data.service.UserService;
import java.util.HashMap;
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
        // dutch money

        map.put("userId", groupInfo.getUserId());
        map.put("userBank", groupInfo.getUserBank());
        map.put("userAccount", groupInfo.getUserAccount());
//        map.put("bank", groupInfo.getBank());
//        map.put("account", groupInfo.getAccount());

        System.out.println("group Info : " + map);

        return map;
    }
}
