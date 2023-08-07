package com.example.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository<Entity, PK 타입>
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
