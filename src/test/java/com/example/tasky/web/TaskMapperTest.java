package com.example.tasky.web;

import com.example.tasky.domain.Task;
import com.example.tasky.domain.TaskPriority;
import com.example.tasky.domain.TaskStatus;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TaskMapperTest {

    @Test
    void toEntity_setsDefaults() {
        var req = new TaskRequest("T", null, null, null, null);
        Task t = TaskMapper.toEntity(req);
        assertThat(t.getStatus()).isEqualTo(TaskStatus.TODO);
        assertThat(t.getPriority()).isEqualTo(TaskPriority.MEDIUM);
    }

    @Test
    void updateEntity_overridesNonNulls() {
        var e = Task.builder().title("A").description("x").build();
        var req = new TaskRequest("B", null, TaskStatus.DONE, null, null);

        TaskMapper.updateEntity(e, req);

        assertThat(e.getTitle()).isEqualTo("B");
        assertThat(e.getStatus()).isEqualTo(TaskStatus.DONE);
    }
}
