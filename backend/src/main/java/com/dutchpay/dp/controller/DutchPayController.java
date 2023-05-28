package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.repository.UserRepository;
import com.dutchpay.dp.data.service.UserService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public String loginAction(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw){
        System.out.println("userId : " + userId);
        System.out.println("userPw: " + userPw);

        try{ // userId가 등록된 회원인 경우
            UserDTO userInfo = userService.getUser(userId);
            System.out.println(userInfo);

            if(userInfo.getUserPw().equals(userPw)){ // 비밀번호 확인
                return "login success";
            } else{
                return "wrong password";
            }
        } catch (Exception e){ // 등록된 회원 정보가 아닐 경우, 로그인 실패
            return "no-existing member";
        }
    }
}
