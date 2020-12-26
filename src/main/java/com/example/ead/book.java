package com.example.ead;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity

public class book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    private String address;
}
