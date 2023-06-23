package com.dutchpay.dp.controller;

import com.dutchpay.dp.data.dto.UserDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.service.GroupsService;
import com.dutchpay.dp.data.service.MembersService;
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
    private MembersService membersService;
    private GroupsService groupsService;
    @Autowired
    public UserInfoController(UserService userService, GroupsService groupsService, MembersService membersService){
        this.userService = userService;
        this.groupsService = groupsService;
        this.membersService = membersService;
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

        // 모든 groupId 구해서 그걸로 setTitle 지정
        List<GroupsEntity> groupsInfo = groupsService.getGroupsList(userId);
        System.out.println("group len : " + groupsInfo.size());

        List<GroupsEntity> distinctGroupsList = new ArrayList<>();
        List<String> setTitleList = new ArrayList<>();
        List<String> dutchMoneyList = new ArrayList<>();
        int onLen = 0, offLen = 0, sumMoney = 0;
        for(int i = 0 ; i < groupsInfo.size() ; i++){
            List<GroupsEntity> contentsInfo = groupsService.getContentsList(groupsInfo.get(i).getCompositeKey().getGroupId());
            String groupId = groupsInfo.get(i).getCompositeKey().getGroupId();
            System.out.println(i + " ## group ID : " + groupId);

            // groupId 중복 제거
            boolean isDuplicate = false;
            for(GroupsEntity distinctGroups : distinctGroupsList){
                if(distinctGroups.getCompositeKey().getGroupId().equals(groupId)){
                    isDuplicate = true;
                    break;
                }
            }
            if(isDuplicate){
                break;
            }

            String setTitle = "";
            int dutchMoeny = 0;
            for(int j = 0 ; j < contentsInfo.size() ; j++){
                String curPayContent = contentsInfo.get(j).getPayContent();
                int money = Integer.parseInt(contentsInfo.get(j).getDutchMoney());
                setTitle += curPayContent;
                dutchMoeny += money;

                if(j != contentsInfo.size() - 1) {
                    setTitle += ", ";
                }
            }
            System.out.println("setTitle : " + setTitle);
            System.out.println("dutchMoeny : " + dutchMoeny);
            setTitleList.add(setTitle);
            dutchMoneyList.add(String.valueOf(dutchMoeny));
            distinctGroupsList.add(groupsInfo.get(i));
        }

        /*
        List<GroupsEntity> contentsInfo = groupsService.getContentsList("79308");
        List<GroupsEntity> distinctGroupsList = new ArrayList<>();
        int onLen = 0, offLen = 0, sumMoney = 0;
        for(GroupsEntity groups : contentsInfo){

            String curGroupId = groups.getCompositeKey().getGroupId();
            String curPayContent = groups.getPayContent();
            boolean isDuplicate = false;
            for(GroupsEntity distinctGroups : distinctGroupsList){
                if(distinctGroups.getCompositeKey().getGroupId().equals(curGroupId) &&
                    distinctGroups.getPayContent().equals(curPayContent)){
                    isDuplicate = true;
                    break;
                }
            }
            if(!isDuplicate){
                System.out.println("groups : " + groups);
                distinctGroupsList.add(groups);
            }
        }

        String setTitle = "";
        for(int i = 0 ; i < distinctGroupsList.size() ; i++){
            setTitle += distinctGroupsList.get(i).getPayContent();
            if(i != distinctGroupsList.size() - 1) {
                setTitle += ", ";
            }

            if(distinctGroupsList.get(i).getState().equals("on")){
                onLen++;
            } else{
                offLen++;
                sumMoney += Integer.parseInt(distinctGroupsList.get(i).getDutchMoney());
            }
        }

         */

        System.out.println("setTitleList : " + setTitleList);
        System.out.println("dutchMoneyList : " + dutchMoneyList);
        System.out.println("distinctGroupsList : " + distinctGroupsList);

        // groupId 별로 인원 수 구하기
        List<String> memberLen = new ArrayList<>();
        for(int i = 0 ; i < distinctGroupsList.size() ; i++){
            String groupId = distinctGroupsList.get(i).getCompositeKey().getGroupId();
            String groupMemberSize = groupsService.getSameGroupMemberLen(groupId);
            memberLen.add(groupMemberSize);
        }

        map.put("onLen", Integer.toString(onLen));
        map.put("offLen", Integer.toString(offLen));
        map.put("setTitleList", setTitleList);
        map.put("dutchMoneyList", dutchMoneyList);
        map.put("sumMoney", Integer.toString(sumMoney));
        map.put("groupsEntityList", distinctGroupsList);
        map.put("memberLen", memberLen);

        return map;
    }

    @PostMapping(value = "/getMembersInfo")
    public HashMap<String, Object> getMembersInfo(@RequestParam("groupId") String groupId){
        HashMap<String, Object> map = new HashMap<>();
//        System.out.println("groupId : " + groupId);

        List<String> membersPhone = new ArrayList<>();
        List<String> membersNmoney = new ArrayList<>();
        List<MembersEntity> membersInfo = membersService.getMembersList(groupId);
//        System.out.println("membersInfo : " + membersInfo);
        for(int i = 0 ; i < membersInfo.size() ; i++){
            String getPhone = membersInfo.get(i).getCompositeKey().getPhone();
            String phoneFormat = getPhone.substring(0, 3) + "-" + getPhone.substring(3, 7) + "-" + getPhone.substring(7);
//            System.out.println("phoneFormat : " + phoneFormat);
            membersPhone.add(phoneFormat);
            membersNmoney.add(membersInfo.get(i).getNMoney());
        }

        map.put("membersPhone", membersPhone);
        map.put("membersNmoney", membersNmoney);

//        System.out.println("membersPhone : " + membersPhone);
//        System.out.println("membersNmoney : " + membersNmoney);

        // groupId로 members table에서 불러오기(phone, n_money)
//        List<String> membersPhone = new ArrayList<>();
//        List<MembersEntity> membersInfo = membersService.getMembersList(groupId);
//        System.out.println("membersInfo : " + membersInfo);
//        for(int i = 0 ; i < membersInfo.size() ; i++){
//            membersPhone.add(membersInfo.get(i).getCompositeKey().getPhone());
//        }
//
//        System.out.println("membersPhone : " + membersPhone);
        return map;
    }
}
