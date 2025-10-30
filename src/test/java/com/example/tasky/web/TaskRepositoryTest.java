package com.example.tasky.web;

import com.example.tasky.TaskRepository;
import com.example.tasky.domain.Task;
import com.example.tasky.domain.TaskPriority;
import com.example.tasky.domain.TaskStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TaskRepositoryTest {

    @Autowired TaskRepository repo;

    @BeforeEach
    void seed() {
        repo.deleteAll();
        repo.save(Task.builder()
                .title("Alpha").status(TaskStatus.TODO).priority(TaskPriority.LOW)
                .createdAt(Instant.now()).updatedAt(Instant.now()).build());
        repo.save(Task.builder()
                .title("Beta").status(TaskStatus.IN_PROGRESS).priority(TaskPriority.MEDIUM)
                .createdAt(Instant.now()).updatedAt(Instant.now()).build());
    }

    @Test
    void findByOptionalFilters_filtersByStatusAndTitle() {
        var page = repo.findByOptionalFilters(TaskStatus.TODO, "alp", PageRequest.of(0,10));
        assertThat(page.getTotalElements()).isEqualTo(1);
        assertThat(page.getContent().get(0).getTitle()).isEqualTo("Alpha");
    }
}
