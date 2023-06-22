package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.MembersService;
import com.dutchpay.dp.data.service.SendMessageService;
import com.dutchpay.dp.data.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.sql.Array;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping(value = "/createMembers")
    public String createDutchPayGroup(@RequestParam("groupId") String groupId, @RequestParam("members") String[] members){
        System.out.println("groupId: " + groupId);
        System.out.println("members: " + Arrays.toString(members));

        // insert to members table
        for(int i = 0 ; i < members.length ; i++){
            membersService.saveMembers(groupId, members[i], null, "no");
        }

        return "success to insert";
    }

    @PostMapping(value = "/createDutchPayGroup")
    public String createDutchPayGroup(@RequestParam("groupId") String groupId,
        @RequestParam("payContent") String[] payContent, @RequestParam("dutchMoney") String[] dutchMoney,
        @RequestParam("phones") String phones,
        @RequestParam("userId") String userId, @RequestParam("userBank") String userBank,
        @RequestParam("userAccount") String userAccount){

//        System.out.println("groupId: " + groupId);
//        System.out.println("payContent: " + payContent);
//        System.out.println("dutchMoney: " + dutchMoney);
//        System.out.println("phones: " + phones);
//        System.out.println("userId: " + userId);
//        System.out.println("userBank: " + userBank);
//        System.out.println("userAccount: " + userAccount);

        try{
            GroupsDTO groupsDTO = groupsService.getGroup(groupId);
            return "already exist";
        } catch (Exception e){
            for(int i = 0 ; i < payContent.length ; i++){
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                System.out.println("Timestamp : " + timestamp);
                groupsService.saveGroup(groupId, String.valueOf(i+1), userId, userBank, userAccount, dutchMoney[i], payContent[i], "on", timestamp);
            }
            return "success to insert";
        }
    }

    @PostMapping(value = "/get_nMoney")
    public String createDutchPayGroup(@RequestBody List<Map<String, Object>> memberPhoneList) {

        System.out.println("memberPhoneList: " + memberPhoneList.size());
        List<String> phoneList = new ArrayList<>();
        List<String> nMoneyList = new ArrayList<>();

        String groupId = memberPhoneList.get(0).get("groupId").toString();
        System.out.println("group id : " + groupId);

        for(int i = 1 ; i < memberPhoneList.size() ; i++){
            phoneList.add(memberPhoneList.get(i).get("phone").toString().replaceAll("-", ""));
            nMoneyList.add(memberPhoneList.get(i).get("n_money").toString());
        }
        System.out.println(phoneList);
        System.out.println(nMoneyList);

        // update
        boolean success = true;
        for(int i = 0 ; i < phoneList.size() ; i++){
            int result = membersService.updateNmoney(groupId, phoneList.get(i), nMoneyList.get(i));
            System.out.println("result : " + result);
            if(result != 1){
                success = false;
            }
        }

        if(success == true){
            return "success to update";
        } else{
            return "fail to update";
        }
    }

    @PostMapping(value = "/changeNmoney")
    public String changeNmoney(@RequestParam("groupId") String groupId,
        @RequestParam("phone") String phone, @RequestParam("updateNmoney") String updateNmoney){

        phone = phone.replace("-", "");
        System.out.println(phone + " " + updateNmoney);

        // update
        int result = membersService.updateNmoney(groupId, phone, updateNmoney);

        if(result == 1){
            return "success to update";
        } else{
            return "fail to update";
        }
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
