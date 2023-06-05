package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.service.GroupsService;
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
    private SendMessageService sendMessageService;
    @Autowired
    public DutchPayController(GroupsService groupsService, SendMessageService sendMessageService){
        this.groupsService = groupsService;
        this.sendMessageService = sendMessageService;
    }

    @PostMapping(value = "/createDutchPayGroup")
    public String createDutchPayGroup(@RequestParam("payContent") String payContent,
        @RequestParam("totalMoney") String totalMoney, @RequestParam("members") String[] members,
        @RequestParam("userId") String userId, @RequestParam("userBank") String userBank,
        @RequestParam("userAccount") String userAccount, @RequestParam("n_money") String n_money){
        System.out.println("payContent: " + payContent);
        System.out.println("totalMoney: " + totalMoney);
        System.out.println("members: " + Arrays.toString(members));
        System.out.println("userId: " + userId);
        System.out.println("userBank: " + userBank);
        System.out.println("userAccount: " + userAccount);
        System.out.println("n_money: " + n_money);

        String randomGroupId = groupsService.createGroupId();
        System.out.println("randomGroupId : " + randomGroupId);

        // insert to groups table
        for(int i = 0 ; i < members.length ; i++){
            groupsService.saveGroup(randomGroupId, members[i], userId, userBank, userAccount, totalMoney, payContent, "off");
        }

        // insert to members table


        return "success";
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
