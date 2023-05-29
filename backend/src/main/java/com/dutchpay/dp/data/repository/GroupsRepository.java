package com.dutchpay.dp.data.repository;

import com.dutchpay.dp.data.entity.GroupsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupsRepository extends JpaRepository<GroupsEntity, String> {
    GroupsEntity findByUserId(String userId);
}
