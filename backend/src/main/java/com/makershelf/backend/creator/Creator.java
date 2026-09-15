package com.makershelf.backend.creator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Creator {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String contact;
}
