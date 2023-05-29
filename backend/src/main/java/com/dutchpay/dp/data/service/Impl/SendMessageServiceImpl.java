package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.service.SendMessageService;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
public class SendMessageServiceImpl implements SendMessageService {
    public String sendMessage(String phone){
        // AWS SNS 클라이언트 생성
        SnsClient snsClient = SnsClient.builder()
            .region(Region.AP_NORTHEAST_1)
            .credentialsProvider(StaticCredentialsProvider.create(
                AwsBasicCredentials.create("AKIAV7YAOUQTVARO6PPP", "secret")))
            .build();

        // 문자 메시지 전송 요청 생성
        PublishRequest request = PublishRequest.builder()
            .message("Dutch Pay Web Application - 송금해주세요")
            .phoneNumber("+82" + phone)
            .build();

        // 문자 메시지 전송 요청 보내기
        PublishResponse response = snsClient.publish(request);

        // 전송 결과 확인
        String result = "Message sent. Message ID: " + response.messageId();

        return result;
    }
}
