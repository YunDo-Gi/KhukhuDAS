package com.example.demo.repository;

import com.example.demo.model.InterestType;
import com.example.demo.model.Room;
import io.lettuce.core.GeoArgs;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    boolean existsByIdAndMemberId(Long roomId, Long MemberId);


    List<Room> findAllByInterestType(InterestType interestType, Sort sort);

    List<Room> findAll(Sort sort);


    List<Room> findAllByMemberId(Long userId);

}
