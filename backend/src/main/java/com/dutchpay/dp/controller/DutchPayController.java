package com.dutchpay.dp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DutchPayController {
    @PostMapping(value = "/login")
    public String loginAction(@RequestParam("id") String id, @RequestParam("pw") String pw){
        System.out.println("id : " + id);
        System.out.println("pw: " + pw);

        return "login access";
    }
}
