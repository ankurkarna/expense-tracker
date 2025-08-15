package com.tracker.expense.Expense.Tracker.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer expenseID;
    @NonNull
    @Column(nullable = false)
    private String title;
    @NonNull
    @Column
    private Double amount;
    private String accessLevel; // user, admin, setAccessLevel("ADMIN");
    @NonNull
    @Column
    private String category;
    private LocalDateTime createdTime;
    private LocalDateTime lastUpdateTime;
    private String paymentMethod;
    private String notes;
    @ManyToOne
    @JoinColumn(name = "userId_FK", referencedColumnName = "userId", nullable = false)
    @JsonBackReference
    private User user;

}
