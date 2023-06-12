package com.example.backend.repositoryDossier;

import com.example.backend.modelsDossier.Logs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface LogsRepository extends JpaRepository<Logs, LocalDateTime> {

}
