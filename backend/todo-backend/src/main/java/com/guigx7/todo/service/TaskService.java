package com.guigx7.todo.service;

import com.guigx7.todo.dto.TaskDto;
import com.guigx7.todo.model.Task;
import com.guigx7.todo.model.User;
import com.guigx7.todo.repository.TaskRepository;
import com.guigx7.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;
    @Autowired
    private UserRepository userRepo;

    public List<TaskDto> listTasks(String userEmail) {
        User user = userRepo.findByEmail(userEmail).orElseThrow();
        return taskRepo.findAllByUser(user)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public TaskDto createTask(String userEmail, TaskDto dto) {
        User user = userRepo.findByEmail(userEmail).orElseThrow();
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setStatus(dto.getStatus());
        task.setUser(user);
        Task saved = taskRepo.save(task);
        return toDto(saved);
    }

    public TaskDto updateTask(Long id, String userEmail, TaskDto dto) {
        Task task = taskRepo.findById(id).orElseThrow();
        if (!task.getUser().getEmail().equals(userEmail)) throw new RuntimeException();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setStatus(dto.getStatus());
        return toDto(taskRepo.save(task));
    }

    public void deleteTask(Long id, String userEmail) {
        Task task = taskRepo.findById(id).orElseThrow();
        if (!task.getUser().getEmail().equals(userEmail)) throw new RuntimeException();
        taskRepo.delete(task);
    }

    private TaskDto toDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setStatus(task.getStatus());
        return dto;
    }
}
