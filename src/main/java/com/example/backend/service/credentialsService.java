package com.example.backend.service;

import com.example.backend.payload.request.LoginRequest;
import com.example.backend.modelsDossier.Credentials;
import com.example.backend.repositoryDossier.CredentialsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class credentialsService {
    @Autowired
    private CredentialsRepo credentialsRepo;

    public Optional<Credentials> findUser(LoginRequest loginRequest) {
        return credentialsRepo.findByLogin(loginRequest.getLogin());
    }
}
