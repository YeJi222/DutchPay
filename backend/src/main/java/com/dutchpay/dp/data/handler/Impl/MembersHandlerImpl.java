package com.dutchpay.dp.data.handler.Impl;

import com.dutchpay.dp.data.dao.GroupsDAO;
import com.dutchpay.dp.data.dao.MembersDAO;
import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.MembersDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.entity.compositeKey.GroupsPK;
import com.dutchpay.dp.data.entity.compositeKey.MembersPK;
import com.dutchpay.dp.data.handler.MembersHandler;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MembersHandlerImpl implements MembersHandler {
    MembersDAO membersDAO;

    @Autowired
    public MembersHandlerImpl(MembersDAO membersDAO){
        this.membersDAO = membersDAO;
    }

    @Override
    public List<MembersEntity> getMembersEntityList(String groupId){
        List<MembersEntity> membersEntityList = membersDAO.getMembersEntityList(groupId);
        return membersEntityList;
    }

    @Override
    public MembersDTO saveMembersEntity(String groupId, String phone, String nMoney, String sendState){
        MembersPK compositeKey = new MembersPK(groupId, phone);
        MembersEntity membersEntity = new MembersEntity(compositeKey, nMoney, sendState);
        membersEntity = membersDAO.saveMembers(membersEntity);
        MembersDTO members = new MembersDTO(membersEntity.getCompositeKey().getGroupId(), membersEntity.getCompositeKey().getPhone(),
            membersEntity.getNMoney(), membersEntity.getSendState());

        return members;
    }
}
