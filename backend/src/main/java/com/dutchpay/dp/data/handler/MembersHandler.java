package com.dutchpay.dp.data.handler;

import com.dutchpay.dp.data.dto.GroupsDTO;
import com.dutchpay.dp.data.dto.MembersDTO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import java.util.List;

public interface MembersHandler {
    List<MembersEntity> getMembersEntityList(String groupId);
    MembersDTO saveMembersEntity(String groupId, String phone, String nMoney, String sendState);
    int updateNmoney(String groupId, String phone, String nMoney);
}
