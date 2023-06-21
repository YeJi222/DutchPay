package com.dutchpay.dp.data.dao.Impl;

import com.dutchpay.dp.data.dao.ContentsDAO;
import com.dutchpay.dp.data.entity.ContentsEntity;
import com.dutchpay.dp.data.repository.ContentsRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContentsDAOImpl implements ContentsDAO {
    ContentsRepository contentsRepository;

    @Autowired
    public ContentsDAOImpl(ContentsRepository contentsRepository){
        this.contentsRepository = contentsRepository;
    }

    @Override
    public ContentsEntity saveContents(ContentsEntity contentsEntity){
        contentsRepository.save(contentsEntity);
        return contentsEntity;
    }

//    @Override
//    public ContentsEntity getContents(String groupId){
//        List<ContentsEntity> contentsEntity = contentsRepository.getReferenceById(groupId);
//        ContentsEntity contentsEntity = contentsEntity.get(0);
//        return contentsEntity;
//    }
}
