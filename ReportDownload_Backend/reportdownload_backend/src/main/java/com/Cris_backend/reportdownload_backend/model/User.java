package com.Cris_backend.reportdownload_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // Changed to "users" (plural) to avoid conflict with SQL reserved word
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) // Username must be unique
    private String username;

    @Column(nullable = false) // Password cannot be null
    private String password;

    @Column(nullable = false)
    private String role; // e.g., "USER", "ADMIN"

    // ✅ Default constructor (needed by JPA)
    public User() {
    }

    // ✅ Parameterized constructor (useful for creating objects)
    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // ✅ Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
