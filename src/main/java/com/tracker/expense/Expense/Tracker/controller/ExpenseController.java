package com.tracker.expense.Expense.Tracker.controller;

import com.tracker.expense.Expense.Tracker.dto.ExpenseDTO;
import com.tracker.expense.Expense.Tracker.entity.Expense;
import com.tracker.expense.Expense.Tracker.service.ExpenseService;
import com.tracker.expense.Expense.Tracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;


    private UUID getCurrentUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUserId();
    }

    @PostMapping
    public ResponseEntity<?> addExpense(@Valid @RequestBody ExpenseDTO request) {
        try {
            UUID userUUID = getCurrentUserId();
            Expense savedExpense = expenseService.createExpense(request, userUUID);
            return ResponseEntity.ok(savedExpense);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> readExpensesForCurrentUser() {
        try {
            UUID userUUID = getCurrentUserId();
            List<Expense> expenses = expenseService.getAllExpensesForUser(userUUID);
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<?> readExpenseById(@PathVariable Integer expenseId) {
        try {
            UUID userUUID = getCurrentUserId();
            Optional<Expense> expense = expenseService.getEntry(expenseId, userUUID);
            return expense.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<?> updateExpense(@PathVariable Integer expenseId, @RequestBody ExpenseDTO expenseDTO){
        UUID currentUserId = getCurrentUserId();
        Optional<Expense> entry = expenseService.getEntry(expenseId, currentUserId);
        if(entry.isPresent()){
            Expense updatedExpense = expenseService.updateExpense(entry.get(), expenseDTO);
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<?> deleteEntryById(@PathVariable Integer expenseId) {
        try {
            UUID userUUID = getCurrentUserId();
            Optional<Expense> expenseDeleted = expenseService.getEntry(expenseId, userUUID);
            if (expenseDeleted.isPresent()) {
                expenseService.deleteById(expenseId);
                return ResponseEntity.ok(expenseDeleted.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error: " + e.getMessage());
        }
    }
}
