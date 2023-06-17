package com.dutchpay.dp.data.repository;

import com.dutchpay.dp.data.entity.GroupsEntity;
import com.dutchpay.dp.data.entity.MembersEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRepository extends JpaRepository<MembersEntity, String> {
    List<MembersEntity> findByCompositeKeyGroupId(String groupId);
    @Modifying
    @Query(value = "UPDATE members SET n_money = :nMoney_value WHERE groupId = :groupId AND phone = :phone", nativeQuery = true)
    int updateNmoney(@Param("groupId")String groupId, @Param("phone")String phone, @Param("nMoney_value")String nMoney);
}