package com.enya.flagservice.controller;

import com.enya.flagservice.service.FlagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/flags")
public class AdminController {
    private final FlagService flagService;

    public AdminController(FlagService flagService) {
        this.flagService = flagService;
    }

    @PostMapping("/reload")
    public ResponseEntity<?> reloadFlags() {
        flagService.reloadFlags();
        return ResponseEntity.ok(Map.of("message", "Flags reloaded successfully!"));
    }
}

