package com.example.tasky.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import com.example.tasky.domain.TaskStatus;
import com.example.tasky.domain.TaskPriority;

public record TaskRequest(
    @NotBlank @Size(max = 100) String title,
    String description,
    TaskStatus status,
    TaskPriority priority,
    LocalDate dueDate
) {}

