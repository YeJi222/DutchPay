package com.dutchpay.dp.data.service.Impl;

import com.dutchpay.dp.data.dto.MembersDTO;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.handler.MembersHandler;
import com.dutchpay.dp.data.service.MembersService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MembersServiceImpl implements MembersService {
    MembersHandler membersHandler;

    @Autowired
    public MembersServiceImpl(MembersHandler membersHandler){
        this.membersHandler = membersHandler;
    }

    @Override
    public List<MembersEntity> getMembersList(String groupId){
        return membersHandler.getMembersEntityList(groupId);
    }

    @Override
    public MembersDTO saveMembers(String groupId, String phone, String nMoney, String sendState){
        return membersHandler.saveMembersEntity(groupId, phone, nMoney, sendState);
    }

    @Override
    public int updateNmoney(String groupId, String phone, String nMoney){
        return membersHandler.updateNmoney(groupId, phone, nMoney);
    }

    @Override
    public int updateState(String groupId, String phone, String stateValue){
        return membersHandler.updateState(groupId, phone, stateValue);
    }
}
