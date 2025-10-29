package com.example.tasky.web;

import com.example.tasky.domain.Task;
import com.example.tasky.domain.TaskPriority;
import com.example.tasky.domain.TaskStatus;

import java.time.Instant;
import java.time.LocalDate;

public final class TaskMapper {
    private TaskMapper() {}

    public static Task toEntity(TaskRequest req) {
        if (req == null) return null;
        TaskStatus status = req.status() != null ? req.status() : TaskStatus.TODO;
        TaskPriority priority = req.priority() != null ? req.priority() : TaskPriority.MEDIUM;
        return Task.builder()
                .title(req.title())
                .description(req.description())
                .status(status)
                .priority(priority)
                .dueDate(req.dueDate())
                .build();
    }

    public static void updateEntity(Task entity, TaskRequest req) {
        if (entity == null || req == null) return;
        if (req.title() != null) entity.setTitle(req.title());
        // description and dueDate may be null to clear the field
        entity.setDescription(req.description());
        entity.setDueDate(req.dueDate());
        if (req.status() != null) entity.setStatus(req.status());
        if (req.priority() != null) entity.setPriority(req.priority());
    }

    public static TaskResponse toResponse(Task t) {
        if (t == null) return null;
        return new TaskResponse(
                t.getId(),
                t.getTitle(),
                t.getDescription(),
                t.getStatus(),
                t.getPriority(),
                t.getDueDate(),
                t.getCreatedAt(),
                t.getUpdatedAt()
        );
    }
}


record TaskResponse(
    Long id,
    String title,
    String description,
    TaskStatus status,
    TaskPriority priority,
    LocalDate dueDate,
    Instant createdAt,
    Instant updatedAt
) {}

