package com.example.ead;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class service {
    private final repository repository;

    public service(com.example.ead.repository repository) {
        this.repository = repository;
    }

    public List<book> findAll(){
        return repository.findAll();
    }

    public Optional<book> findById(Long id){
        return repository.findById(id);
    }

    public book save(book book){
        return repository.save(book);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
