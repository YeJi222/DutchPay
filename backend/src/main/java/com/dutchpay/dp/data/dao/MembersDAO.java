package com.dutchpay.dp.data.dao;

import com.dutchpay.dp.data.entity.MembersEntity;
import java.util.List;

public interface MembersDAO {
    List<MembersEntity> getMembersEntityList(String groupId);
    MembersEntity saveMembers(MembersEntity membersEntity);
    int updateNmoney(String groupId, String phone, String nMoney);
}
