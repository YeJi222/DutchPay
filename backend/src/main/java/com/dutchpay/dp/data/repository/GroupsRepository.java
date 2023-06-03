package com.dutchpay.dp.data.repository;

import com.dutchpay.dp.data.entity.GroupsEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupsRepository extends JpaRepository<GroupsEntity, String> {
    List<GroupsEntity> findByUserId(String userId);
}
