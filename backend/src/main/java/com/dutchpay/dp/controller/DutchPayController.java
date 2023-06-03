package com.dutchpay.dp.controller;

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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DutchPayController {
    private SendMessageService sendMessageService;
    @Autowired
    public DutchPayController(SendMessageService sendMessageService){
        this.sendMessageService = sendMessageService;
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
