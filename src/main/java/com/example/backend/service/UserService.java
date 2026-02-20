package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder;
    
 // コンストラクタでBCryptPasswordEncoderを初期化
    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public void registerUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPasswordHash(encryptPassword(userDto.getPassword())); // パスワードを暗号化
        user.setRole(userDto.getRole());
        user.setDepartment(userDto.getDepartment());
        userRepository.save(user);
    }

    private String encryptPassword(String password) {
        return passwordEncoder.encode(password); // BCryptで暗号化
    }
    
    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPasswordHash())) {
            return user;
        }
        return null;
    }
}

