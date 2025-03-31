package com.Cris_backend.reportdownload_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportName;
    private String date;
    private String location;
    private String content;

    // Getters and Setters
}
