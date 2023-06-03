package com.dutchpay.dp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ValidationController {
    @PostMapping(value = "/checkValidAccount")
    public String loginAction(@RequestParam("inputBank") String inputBank, @RequestParam("inputAccount") String inputAccount){
        System.out.println("inputBank : " + inputBank);
        System.out.println("inputAccount : " + inputAccount.length());
        boolean accountLen = false;

        // 계좌번호 길이 : 10 ~ 16자리
        if(inputAccount.length() < 10 || inputAccount.length() > 16){
            accountLen = false;
        } else{
            accountLen = true;
        }

        // 은행별 계좌번호 체계 확인



//        try{ // 이미 등록된 회원인 경우,
//            UserDTO userInfo = userService.getUser(userId);
//            // System.out.println(userInfo);
//
//            return "existing member";
//        } catch (Exception e){ // 등록된 회원 정보가 아닐 경우, sign up
//            userService.saveUser(userId, userPw, phone, bank, account);
//
//            return "signUp success";
//        }
        return "check valid account";
    }
}
