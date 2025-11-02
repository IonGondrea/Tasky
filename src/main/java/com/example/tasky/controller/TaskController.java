package com.example.tasky.web;

import com.example.tasky.domain.TaskStatus;
import com.example.tasky.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Validated
@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @Operation(summary = "Create new task", description = "Creează un nou task pe baza datelor primite.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Task creat cu succes"),
            @ApiResponse(responseCode = "400", description = "Date invalide")
    })    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody TaskRequest request) {
        TaskResponse created = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    @Operation(summary = "Get task by ID", description = "Returnează un task după ID-ul specificat.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Task găsit"),
            @ApiResponse(responseCode = "404", description = "Task inexistent")
    })
    @GetMapping("/{id}")
    public TaskResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }


    @Operation(summary = "Update existing task", description = "Actualizează un task existent folosind ID-ul și noile date.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Task actualizat cu succes"),
            @ApiResponse(responseCode = "404", description = "Task inexistent")
    })
    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable Long id, @Valid @RequestBody TaskRequest request) {
        return service.update(id, request);
    }


    @Operation(summary = "Delete task", description = "Șterge un task după ID-ul specificat.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Task șters cu succes"),
            @ApiResponse(responseCode = "404", description = "Task inexistent")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @Operation(summary = "List all tasks", description = "Returnează lista paginată; filtre opționale după status și q.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista returnată cu succes")
    })
    @GetMapping
    public Page<TaskResponse> list(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) String q,
            @ParameterObject @PageableDefault(size = 10, sort = "createdAt") Pageable pageable
    ) {
        return service.list(status, q, pageable);
    }
}
