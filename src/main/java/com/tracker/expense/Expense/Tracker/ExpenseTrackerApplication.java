package com.tracker.expense.Expense.Tracker;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ExpenseTrackerApplication {

	public static void main(String[] args) {
        // Configure dotenv to look in a specific subdirectory
        Dotenv.configure()
                .directory("./Expense-Tracker") // <-- Tells it to look in this folder
                .systemProperties()
                .load();
		SpringApplication.run(ExpenseTrackerApplication.class, args);
	}

}
