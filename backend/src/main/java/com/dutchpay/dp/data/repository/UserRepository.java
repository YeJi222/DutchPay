package com.dutchpay.dp.data.repository;

import com.dutchpay.dp.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<UserEntity, String>{

}
