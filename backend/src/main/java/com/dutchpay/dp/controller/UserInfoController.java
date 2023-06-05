package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.UserService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserInfoController {
    private UserService userService;
    private GroupsService groupsService;
    @Autowired
    public UserInfoController(UserService userService, GroupsService groupsService){
        this.userService = userService;
        this.groupsService = groupsService;
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

    @PostMapping(value = "/getUserInfo")
    public HashMap<String, Object> getUserInfo(@RequestParam("sessionUserId") String userId){
        HashMap<String, Object> map = new HashMap<>();
        UserDTO userInfo = userService.getUser(userId);

        map.put("userId", userInfo.getUserId());
        map.put("userPw", userInfo.getUserPw());
        map.put("phone", userInfo.getPhone());
        map.put("bank", userInfo.getBank());
        map.put("account", userInfo.getAccount());

        List<GroupsEntity> groupsInfo = groupsService.getGroupsList(userId);
        List<GroupsEntity> distinctGroupsList = new ArrayList<>();
        int onLen = 0, offLen = 0, sumMoney = 0;
        for(GroupsEntity groups : groupsInfo){
            String curGroupId = groups.getCompositeKey().getGroupId();
            boolean isDuplicate = false;
            for(GroupsEntity distinctGroups : distinctGroupsList){
                if(distinctGroups.getCompositeKey().getGroupId().equals(curGroupId)){
                    isDuplicate = true;
                    break;
                }
            }
            if(!isDuplicate){
                distinctGroupsList.add(groups);
            }
        }

        for(int i = 0 ; i < distinctGroupsList.size() ; i++){
            if(distinctGroupsList.get(i).getState().equals("on")){
                onLen++;
            } else{
                offLen++;
                sumMoney += Integer.parseInt(distinctGroupsList.get(i).getTotalMoney());
            }
        }

        // groupId 별로 인원 수 구하기
        List<String> memberLen = new ArrayList<>();
        for(int i = 0 ; i < distinctGroupsList.size() ; i++){
            String groupId = distinctGroupsList.get(i).getCompositeKey().getGroupId();
            String groupMemberSize = groupsService.getSameGroupMemberLen(groupId);
            memberLen.add(groupMemberSize);
        }

        map.put("onLen", Integer.toString(onLen));
        map.put("offLen", Integer.toString(offLen));
        map.put("sumMoney", Integer.toString(sumMoney));
        map.put("groupsEntityList", distinctGroupsList);
        map.put("memberLen", memberLen);

        return map;
    }
}
