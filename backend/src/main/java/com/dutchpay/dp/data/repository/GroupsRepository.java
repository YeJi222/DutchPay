package com.dutchpay.dp.data.repository;

import com.dutchpay.dp.data.entity.GroupsEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupsRepository extends JpaRepository<GroupsEntity, String> {
    List<GroupsEntity> findByUserId(String userId);
    // List<GroupsEntity> findByGroupId(String groupId);
    List<GroupsEntity> findByCompositeKeyGroupId(String groupId);

    @Query(value = "SELECT DISTINCT group_id FROM groups", nativeQuery = true)
    List<String> findDistinctGroupId();

    @Modifying
    @Query(value = "UPDATE groups SET state = :state_value WHERE group_id = :groupId", nativeQuery = true)
    int updateGroupState(@Param("groupId")String groupId, @Param("state_value")String stateValue);
}
