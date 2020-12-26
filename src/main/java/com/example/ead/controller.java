package com.example.ead;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class controller {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
