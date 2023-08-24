package com.example.demo.repository;

import com.example.demo.model.MediaObject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaObjectRepository extends JpaRepository<MediaObject, Long> {
}
