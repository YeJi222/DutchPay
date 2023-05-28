package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.repository.UserRepository;
import com.dutchpay.dp.data.service.UserService;
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

        userService.saveUser(userId, userPw, phone, bank, account);

        return "signUp success";
    }
    @PostMapping(value = "/login")
    public String loginAction(@RequestParam("id") String id, @RequestParam("pw") String pw){
        System.out.println("id : " + id);
        System.out.println("pw: " + pw);

        return "login success";
    }
}
