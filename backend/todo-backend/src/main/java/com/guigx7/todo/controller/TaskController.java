package com.guigx7.todo.controller;

import com.guigx7.todo.dto.TaskDto;
import com.guigx7.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAll(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(taskService.listTasks(email));
    }

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody TaskDto dto, Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(taskService.createTask(email, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(
            @PathVariable Long id,
            @RequestBody TaskDto dto,
            Authentication auth
    ) {
        String email = auth.getName();
        return ResponseEntity.ok(taskService.updateTask(id, email, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        taskService.deleteTask(id, email);
        return ResponseEntity.ok().build();
    }
}
