package com.example.tasky;

import com.example.tasky.domain.Task;
import com.example.tasky.service.TaskServiceImpl;
import com.example.tasky.web.TaskRequest;
import com.example.tasky.web.TaskResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    TaskRepository repository;

    @InjectMocks
    TaskServiceImpl service;

    @Test
    void create_savesAndReturnsResponse() {
        TaskRequest req = new TaskRequest("T1", "d", null, null, null);
        Task saved = Task.builder().id(1L).title("T1").build();
        when(repository.save(any(Task.class))).thenReturn(saved);

        TaskResponse resp = service.create(req);

        ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);
        verify(repository).save(captor.capture());
        assertEquals("T1", captor.getValue().getTitle());
        assertEquals(1L, resp.id());
    }

    @Test
    void findById_throws404_whenMissing() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
                () -> service.findById(99L));
        assertEquals(404, ex.getStatusCode().value());
    }

    @Test
    void list_mapsPageToDto() {
        Task t = Task.builder().id(1L).title("A").build();
        when(repository.findByOptionalFilters(eq(null), eq(null), any()))
                .thenReturn(new PageImpl<>(List.of(t)));

        Page<TaskResponse> page = service.list(null, null, PageRequest.of(0, 10));

        assertEquals(1, page.getTotalElements());
        assertEquals("A", page.getContent().get(0).title());
    }
}
