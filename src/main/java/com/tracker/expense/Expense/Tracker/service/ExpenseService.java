package com.tracker.expense.Expense.Tracker.service;

import com.tracker.expense.Expense.Tracker.dto.ExpenseDTO;
import com.tracker.expense.Expense.Tracker.entity.Expense;
import com.tracker.expense.Expense.Tracker.entity.User;
import com.tracker.expense.Expense.Tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserService userService;

    public Expense createExpense(ExpenseDTO request, UUID userId) {
        Optional<User> userOptional = userService.findUser(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found: " + userId);
        }

        User user = userOptional.get();
        Expense expense = new Expense();
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setPaymentMethod(request.getPaymentMethod());
        expense.setNotes(request.getNotes());
        expense.setUser(user);
        expense.setCreatedTime(LocalDateTime.now());

        AtomicReference<Expense> savedExpense = new AtomicReference<>(expenseRepository.save(expense));
        return savedExpense.get();
    }

    public Optional<Expense> getEntry(Integer id, UUID userId) {
        return expenseRepository.findByExpenseIDAndUser_UserId(id, userId);
    }

    public List<Expense> getAllExpensesForUser(UUID userId) {
        return expenseRepository.findAllByUser_UserId(userId);
    }

    public void deleteById(Integer id) {
        expenseRepository.deleteById(id);
    }
}
