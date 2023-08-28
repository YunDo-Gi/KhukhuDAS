package com.example.demo.repository;

import com.example.demo.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository<Entity, PK 타입>
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmail(String email);


    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByPhoneNumber(String phoneNumber);

}
