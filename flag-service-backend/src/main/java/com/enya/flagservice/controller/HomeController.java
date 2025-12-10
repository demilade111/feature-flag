package com.enya.flagservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public Map<String, Object> home() {
        return Map.of(
            "status", "online",
            "message", "Flag Service API"
        );
    }
}

