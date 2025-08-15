package com.tracker.expense.Expense.Tracker.repository;

import com.tracker.expense.Expense.Tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    Optional<Expense> findByExpenseIDAndUser_UserId(Integer expenseId, UUID userId);

    List<Expense> findAllByUser_UserId(UUID userId);

}