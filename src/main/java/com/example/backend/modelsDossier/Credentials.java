package com.example.backend.modelsDossier;



import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "credentials", schema="pfr")
public class Credentials {
    @Id
    @Column(name = "login")
    private String login;

    @Column(name = "password")
    private String password;
    public Credentials() {
    }

    public Credentials(String login, String password) {
        this.login = login;
        this.password = password;
    }



    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



}