package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.repository.UserRepository;
import com.dutchpay.dp.data.service.UserService;
import java.io.IOException;
import java.util.HashMap;
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
    @Autowired
    public DutchPayController(UserService userService){
        this.userService = userService;
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
            System.out.println(userInfo);

            return "existing member";
        } catch (Exception e){ // 등록된 회원 정보가 아닐 경우, sign up
            userService.saveUser(userId, userPw, phone, bank, account);

            return "signUp success";
        }
    }
    @PostMapping(value = "/login")
    public HashMap<String, Object> loginAction(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw){
        HashMap<String, Object> map = new HashMap<>();

        System.out.println("userId : " + userId);
        System.out.println("userPw: " + userPw);

        try{ // userId가 등록된 회원인 경우
            UserDTO userInfo = userService.getUser(userId);
            System.out.println(userInfo);

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
            System.out.println(map);
            return map;
        } catch (Exception e){ // 등록된 회원 정보가 아닐 경우, 로그인 실패
            map.put("responseData", "no-existing member");

            return map;
        }
    }

    @PostMapping(value = "/sendMessage")
    public String sendMessageAction(){
        // AWS SNS 클라이언트 생성
        SnsClient snsClient = SnsClient.builder()
            .region(Region.AP_NORTHEAST_1)
            .credentialsProvider(StaticCredentialsProvider.create(
                AwsBasicCredentials.create("AKIAV7YAOUQTVARO6PPP", "secret")))
            .build();

        // 문자 메시지 전송 요청 생성
        PublishRequest request = PublishRequest.builder()
            .message("send message test")
            .phoneNumber("+8201071061792")
            .build();

        // 문자 메시지 전송 요청 보내기
        PublishResponse response = snsClient.publish(request);

        // 전송 결과 확인
        System.out.println("Message sent. Message ID: " + response.messageId());

        return "send message";
    }
}
