package com.guigx7.todo.repository;

import com.guigx7.todo.model.Task;
import com.guigx7.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUser(User user);
}
