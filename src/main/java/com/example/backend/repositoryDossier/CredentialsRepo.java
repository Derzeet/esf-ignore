package com.example.backend.repositoryDossier;


import com.example.backend.modelsDossier.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CredentialsRepo extends JpaRepository<Credentials, String> {
    Optional<Credentials> findByLogin(String login);
//    Boolean existsByUsername(String login);
//
//    Boolean existsByEmail(String login);
}
