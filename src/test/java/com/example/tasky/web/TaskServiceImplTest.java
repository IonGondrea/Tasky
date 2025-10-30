package com.example.tasky.web;

import com.example.tasky.TaskRepository;
import com.example.tasky.domain.Task;
import com.example.tasky.domain.TaskPriority;
import com.example.tasky.domain.TaskStatus;

import com.example.tasky.service.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.time.Instant;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock TaskRepository repository;

    @InjectMocks
    TaskServiceImpl service;

    @Test
    void create_savesAndReturnsResponse() {
        var req = new TaskRequest("T1","d", TaskStatus.TODO, TaskPriority.MEDIUM, null);
        var saved = Task.builder()
                .id(1L).title("T1").description("d")
                .status(TaskStatus.TODO).priority(TaskPriority.MEDIUM)
                .createdAt(Instant.now()).updatedAt(Instant.now()).build();

        when(repository.save(any(Task.class))).thenReturn(saved);

        TaskResponse resp = service.create(req);

        var captor = ArgumentCaptor.forClass(Task.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getTitle()).isEqualTo("T1");
        assertThat(resp.id()).isEqualTo(1L);
    }

    @Test
    void findById_throwsWhenMissing() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> service.findById(99L));
    }

    @Test
    void list_mapsPageToDto() {
        var task = Task.builder()
                .id(1L).title("A").status(TaskStatus.TODO)
                .priority(TaskPriority.LOW).createdAt(Instant.now()).updatedAt(Instant.now())
                .build();

        var page = new PageImpl<>(java.util.List.of(task), PageRequest.of(0,10), 1);

        when(repository.findByOptionalFilters(null, null, PageRequest.of(0,10)))
                .thenReturn(page);

        var result = service.list(null, null, PageRequest.of(0,10));

        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent().get(0).title()).isEqualTo("A");
    }
}
