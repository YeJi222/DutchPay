package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.MembersService;
import com.dutchpay.dp.data.service.SendMessageService;
import com.dutchpay.dp.data.service.UserService;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DutchPayController {
    private GroupsService groupsService;
    private MembersService membersService;
    private SendMessageService sendMessageService;
    @Autowired
    public DutchPayController(GroupsService groupsService, MembersService membersService, SendMessageService sendMessageService){
        this.groupsService = groupsService;
        this.membersService = membersService;
        this.sendMessageService = sendMessageService;
    }

    @PostMapping(value = "/createGroupId")
    public String createGroupId(){
        String randomGroupId = groupsService.createGroupId();
        System.out.println("randomGroupId : " + randomGroupId);

        return randomGroupId;
    }

    @PostMapping(value = "/createDutchPayGroup")
    public String createDutchPayGroup(@RequestParam("groupId") String groupId, @RequestParam("payContent") String payContent,
        @RequestParam("totalMoney") String totalMoney, @RequestParam("members") String[] members,
        @RequestParam("userId") String userId, @RequestParam("userBank") String userBank,
        @RequestParam("userAccount") String userAccount, @RequestParam("n_money") String n_money){
        System.out.println("groupId: " + groupId);
        System.out.println("payContent: " + payContent);
        System.out.println("totalMoney: " + totalMoney);
        System.out.println("members: " + Arrays.toString(members));
        System.out.println("userId: " + userId);
        System.out.println("userBank: " + userBank);
        System.out.println("userAccount: " + userAccount);
        System.out.println("n_money: " + n_money);

//        String randomGroupId = groupsService.createGroupId();
//        System.out.println("randomGroupId : " + randomGroupId);

        // insert to groups table
        for(int i = 0 ; i < members.length ; i++){
            groupsService.saveGroup(groupId, members[i], userId, userBank, userAccount, totalMoney, payContent, "on");
        }

        // insert to members table
        for(int i = 0 ; i < members.length ; i++){
            membersService.saveMembers(groupId, members[i], n_money, "no");
        }

        return groupId;
    }

    @PostMapping(value = "/sendMessage")
    public String sendMessageAction(){
        String phone = "01012345678";
        String result = sendMessageService.sendMessage(phone);

        // 전송 결과 확인
        System.out.println(result);

        return "send message";
    }
}
