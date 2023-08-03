package com.example.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<Entity, PK 타입>
public interface UserRepository extends JpaRepository<User, Integer> {

}
