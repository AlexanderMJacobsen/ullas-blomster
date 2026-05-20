package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.Role;
import com.example.ullasblomsterapp.Model.User;
import com.example.ullasblomsterapp.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        user.setRole(Role.CUSTOMER);
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
