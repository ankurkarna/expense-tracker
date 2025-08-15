package com.tracker.expense.Expense.Tracker.controller;

import com.tracker.expense.Expense.Tracker.dto.UserDTO;
import com.tracker.expense.Expense.Tracker.entity.User;
import com.tracker.expense.Expense.Tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/register")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping()
    public ResponseEntity<?> createUser(@RequestBody UserDTO request) {
        try {
            userService.createUser(request);
            return ResponseEntity.ok("user created");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error while creating user: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        try {
            UUID userUUID = UUID.fromString(userId);
            Optional<User> user = userService.findUser(userUUID);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid ID: " + e.getMessage());
        }
    }

    // Test endpoint to create a sample user
//    @PostMapping("/create-test")
//    public ResponseEntity<?> createTestUser() {
//        try {
//            User testUser = new User();
//            testUser.setUserName("ankur");
//            testUser.setPassword("1234");
//
//            User savedUser = userService.createUser(testUser);
//            return ResponseEntity.ok(savedUser);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error creating test : " + e.getMessage());
//        }
//    }
}
