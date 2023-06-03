package com.dutchpay.dp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ValidationController {
    @PostMapping(value = "/checkValidAccount")
    public boolean loginAction(@RequestParam("inputBank") String inputBank, @RequestParam("inputAccount") String inputAccount){
//        System.out.println("inputBank : " + inputBank);
//        System.out.println("inputAccount : " + inputAccount);
//        System.out.println("inputAccount len : " + inputAccount.length());

        // 은행별 계좌번호 길이 확인
        if(inputBank.equals("기업")){ // 14
            if(inputAccount.length() != 14){
                return false;
            }
        } else if(inputBank.equals("국민")){ // 12 or 14
            if(inputAccount.length() != 12 || inputAccount.length() != 14){
                return false;
            }
        } else if(inputBank.equals("하나")){ // 14
            if(inputAccount.length() != 14){
                return false;
            }
        } else if(inputBank.equals("농협") || inputBank.equals("우리") ||
            inputBank.equals("부산") || inputBank.equals("카카오뱅크")){ // 13
            if(inputAccount.length() != 13){
                return false;
            }
        } else if(inputBank.equals("신한")){ // 11 ~ 14
            if(inputAccount.length() < 11 || inputAccount.length() > 14){
                return false;
            }
        } else{ // 기타 은행 : 10 ~ 16자리
            if(inputAccount.length() < 10 || inputAccount.length() > 16){
                return false;
            }
        }

        return true;
    }
}
