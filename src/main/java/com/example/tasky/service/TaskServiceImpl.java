package com.example.tasky.service;

import com.example.tasky.repo.TaskRepository;
import com.example.tasky.domain.Task;
import com.example.tasky.domain.TaskStatus;
import com.example.tasky.web.TaskMapper;
import com.example.tasky.web.TaskRequest;
import com.example.tasky.web.TaskResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;


    public TaskServiceImpl(TaskRepository repository) {
        this.repository = repository;
    }

    @Override

    public TaskResponse create(TaskRequest request) {
        Task entity = TaskMapper.toEntity(request);
        Task saved = repository.save(entity);
        return TaskMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public TaskResponse update(Long id, TaskRequest request) {
        Task entity = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        TaskMapper.updateEntity(entity, request);
        Task saved = repository.save(entity);
        return TaskMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public TaskResponse findById(Long id) {
        Task entity = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        return TaskMapper.toResponse(entity);
    }


    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        repository.deleteById(id);
    }


    @Override
    public Page<TaskResponse> list(TaskStatus status, String q, Pageable pageable) {
        String normalizedQ = (q == null || q.isBlank()) ? null : q;
        Page<Task> page = repository.findByOptionalFilters(status, normalizedQ, pageable);
        return page.map(TaskMapper::toResponse);
    }
}

