package com.example.tasky.service;

import com.example.tasky.domain.TaskStatus;
import com.example.tasky.web.TaskRequest;
import com.example.tasky.web.TaskResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    TaskResponse create(TaskRequest request);
    TaskResponse update(Long id, TaskRequest request);
    TaskResponse findById(Long id);
    void delete(Long id);
    Page<TaskResponse> list(TaskStatus status, String q, Pageable pageable);
}

