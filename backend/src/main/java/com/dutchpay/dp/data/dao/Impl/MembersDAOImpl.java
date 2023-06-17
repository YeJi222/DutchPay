package com.dutchpay.dp.data.dao.Impl;

import com.dutchpay.dp.data.dao.MembersDAO;
import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import com.dutchpay.dp.data.repository.GroupsRepository;
import com.dutchpay.dp.data.repository.MembersRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MembersDAOImpl implements MembersDAO {
    MembersRepository membersRepository;

    @Autowired
    public MembersDAOImpl(MembersRepository membersRepository){
        this.membersRepository = membersRepository;
    }

    @Override
    public List<MembersEntity> getMembersEntityList(String groupId){
        List<MembersEntity> membersEntityList = membersRepository.findByCompositeKeyGroupId(groupId);
        return membersEntityList;
    }

    @Override
    public MembersEntity saveMembers(MembersEntity membersEntity){
        membersRepository.save(membersEntity);
        return membersEntity;
    }

    @Override
    public int updateNmoney(String groupId, String phone, String nMoney){
        int result = membersRepository.updateNmoney(groupId, phone, nMoney);
        return result;
    }
}
