package com.example.ead;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class api {
    private final service service;

    public api(service todoService) {
        this.service = todoService;
    }

    @GetMapping
    public ResponseEntity<List<book>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody book book){
        return ResponseEntity.ok(service.save(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<book> update(@PathVariable Long id,@Valid @RequestBody book book ){
        Optional<book> book1 = service.findById(id);
        if(!user1.isPresent()){
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(service.save(book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<book> delete(@PathVariable Long id){
        Optional<book> book = service.findById(id);
        if(!book.isPresent()){
            ResponseEntity.badRequest().build();
        }
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}