package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.repository.UserRepository;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.SendMessageService;
import com.dutchpay.dp.data.service.UserService;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DutchPayController {
    private UserService userService;
    private GroupsService groupsService;
    private SendMessageService sendMessageService;
    @Autowired
    public DutchPayController(UserService userService, GroupsService groupsService, SendMessageService sendMessageService){
        this.userService = userService;
        this.groupsService = groupsService;
        this.sendMessageService = sendMessageService;
    }

    @PostMapping(value = "/signup")
    public String loginAction(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw,
        @RequestParam("phone") String phone, @RequestParam("bank") String bank, @RequestParam("account") String account){
        System.out.println("userId : " + userId);
        System.out.println("userPw: " + userPw);
        System.out.println("phone: " + phone);
        System.out.println("bank: " + bank);
        System.out.println("account: " + account);

        try{ // 이미 등록된 회원인 경우,
            UserDTO userInfo = userService.getUser(userId);
            // System.out.println(userInfo);

            return "existing member";
        } catch (Exception e){ // 등록된 회원 정보가 아닐 경우, sign up
            userService.saveUser(userId, userPw, phone, bank, account);

            return "signUp success";
        }
    }
    @PostMapping(value = "/login")
    public HashMap<String, Object> loginAction(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw){
        HashMap<String, Object> map = new HashMap<>();

        // System.out.println("userId : " + userId);
        // System.out.println("userPw: " + userPw);

        try{ // userId가 등록된 회원인 경우
            UserDTO userInfo = userService.getUser(userId);
            // System.out.println(userInfo);

            if(userInfo.getUserPw().equals(userPw)){ // 비밀번호 확인
                map.put("responseData", "login success");
                map.put("userId", userInfo.getUserId());
                map.put("userPw", userInfo.getUserPw());
                map.put("phone", userInfo.getPhone());
                map.put("bank", userInfo.getBank());
                map.put("account", userInfo.getAccount());

            } else{
                map.put("responseData", "wrong password");

            }
            // System.out.println(map);
            return map;
        } catch (Exception e){ // 등록된 회원 정보가 아닐 경우, 로그인 실패
            map.put("responseData", "no-existing member");

            return map;
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

    @PostMapping(value = "/getUserInfo")
    public HashMap<String, Object> getUserInfo(@RequestParam("sessionUserId") String userId){
        HashMap<String, Object> map = new HashMap<>();

        UserDTO userInfo = userService.getUser(userId);
        // System.out.println("getUserInfo : " + userInfo);

        map.put("userId", userInfo.getUserId());
        map.put("userPw", userInfo.getUserPw());
        map.put("phone", userInfo.getPhone());
        map.put("bank", userInfo.getBank());
        map.put("account", userInfo.getAccount());

        List<GroupsEntity> groupsInfo = groupsService.getGroupsList(userId);
        System.out.println("groupsInfo : " + groupsInfo);

        int onLen = 0;
        int offLen = 0;
        int sumMoney = 0;
        for(int i = 0 ; i < groupsInfo.size() ; i++){
            if(groupsInfo.get(i).getState().equals("on")){
                onLen++;
            } else{
                offLen++;
                sumMoney += Integer.parseInt(groupsInfo.get(i).getTotalMoney());
            }
        }
        map.put("onLen", Integer.toString(onLen));
        map.put("offLen", Integer.toString(offLen));
        map.put("sumMoney", Integer.toString(sumMoney));
        map.put("groupsEntityList", groupsInfo);

        return map;
    }
}
