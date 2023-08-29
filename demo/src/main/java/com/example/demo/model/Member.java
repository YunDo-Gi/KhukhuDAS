package com.example.demo.model;


import com.example.demo.model.BaseTime.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "member")
public class Member extends BaseTimeEntity implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String realName;

    @Column(unique = true)
    private String nickname;

    private String password;

    @Column(unique = true)
    private String email;

    private int age;

    private String profileImgURL;

    @Column(unique = true)
    private String phoneNumber;

    private String job;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "member") //양방향
    private List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "member") //양방향
    private List<RoomLike> roomLikes = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<Comment> diaryComments = new ArrayList<>();



    @Override  // 계정이 갖고 있는 권한 목록 리턴
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // List.of() : 불변하는 리스트를 생성해서 반환
        // SimpleGrantedAuthority : 문자열을 받아서 role로 지정한다.
        // role.name() : role에 열거된 상수들의 이름을 문자열로 가져옴
        return List.of(new SimpleGrantedAuthority(role.getValue()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


