package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.User;
import com.example.ullasblomsterapp.Service.AuthService;
import com.example.ullasblomsterapp.Service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authService.login(user.getEmail(), user.getPassword());
    }
}