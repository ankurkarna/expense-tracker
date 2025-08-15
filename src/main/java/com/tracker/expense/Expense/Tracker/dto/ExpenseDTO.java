package com.tracker.expense.Expense.Tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ExpenseDTO {

    @NotBlank(message = "Title  required")
    private String title;

    @NotNull(message = "Amount  required")
    @Positive(message = "Amount greater than 0")
    private Double amount;

    @NotBlank(message = "Category is required")
    private String category;

    private String paymentMethod;

    private String notes;

}
