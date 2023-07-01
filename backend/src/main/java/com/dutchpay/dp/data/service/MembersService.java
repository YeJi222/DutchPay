package com.dutchpay.dp.data.service;

import com.dutchpay.dp.data.dto.MembersDTO;
import com.dutchpay.dp.data.entity.MembersEntity;
import java.util.List;

public interface MembersService {
    List<MembersEntity> getMembersList(String groupId);
    MembersDTO saveMembers(String groupId, String phone, String nMoney, String sendState);
    int updateNmoney(String groupId, String phone, String nMoney);
    int updateState(String groupId, String phone, String stateValue);
}
