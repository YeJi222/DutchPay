package com.dutchpay.dp.data.repository;

import com.dutchpay.dp.data.entity.ContentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentsRepository extends JpaRepository<ContentsEntity, String>  {

}
