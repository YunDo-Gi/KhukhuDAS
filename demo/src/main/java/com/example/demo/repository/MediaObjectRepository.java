package com.example.demo.repository;

import com.example.demo.model.MediaObject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaObjectRepository extends JpaRepository<MediaObject, Long> {

    List<MediaObject> findAllByRoomId(Long roomId);
}
