package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.MembersService;
import com.dutchpay.dp.data.service.SendMessageService;
import com.dutchpay.dp.data.service.UserService;
import java.io.IOException;
import java.util.ArrayList;
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
//        System.out.println("groupId: " + groupId);
//        System.out.println("payContent: " + payContent);
//        System.out.println("totalMoney: " + totalMoney);
//        System.out.println("members: " + Arrays.toString(members));
//        System.out.println("userId: " + userId);
//        System.out.println("userBank: " + userBank);
//        System.out.println("userAccount: " + userAccount);
//        System.out.println("n_money: " + n_money);

        // insert to groups table
        // members 말고 contents 넣기

        for(int i = 0 ; i < members.length ; i++){
            groupsService.saveGroup(groupId, members[i], userId, userBank, userAccount, totalMoney, payContent, "on");
        }

        // insert to members table
        for(int i = 0 ; i < members.length ; i++){
            membersService.saveMembers(groupId, members[i], n_money, "no");
        }

        /*
        HashMap<String, Object> map = new HashMap<>();
        List<String> membersPhone = new ArrayList<>();
        List<String> membersNmoney = new ArrayList<>();
        List<MembersEntity> membersInfo = membersService.getMembersList(groupId);
//        System.out.println("membersInfo : " + membersInfo);
        for(int i = 0 ; i < membersInfo.size() ; i++){
            membersPhone.add(membersInfo.get(i).getCompositeKey().getPhone());
            membersNmoney.add(membersInfo.get(i).getNMoney());
        }

        map.put("membersPhone", membersPhone);
        map.put("membersNmoney", membersNmoney);

//        System.out.println("membersPhone : " + membersPhone);
//        System.out.println("membersNmoney : " + membersNmoney);

         */

        return "success to insert";
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
