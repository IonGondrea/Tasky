package com.example.tasky.repo;

import com.example.tasky.domain.Task;
import com.example.tasky.domain.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByStatus(TaskStatus status, Pageable pageable);

    Page<Task> findByTitleContainingIgnoreCase(String q, Pageable pageable);

    @Query("""
        select t from Task t
        where (:status is null or t.status = :status)
          and (:q is null or lower(t.title) like lower(concat('%', :q, '%')))
        order by t.createdAt desc
        """)
    Page<Task> findByOptionalFilters(@Param("status") TaskStatus status,
                                     @Param("q") String q,
                                     Pageable pageable);
}
