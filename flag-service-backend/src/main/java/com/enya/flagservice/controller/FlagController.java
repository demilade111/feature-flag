package com.enya.flagservice.controller;
import com.enya.flagservice.dto.FlagResponse;
import com.enya.flagservice.service.FlagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/flags")
public class FlagController {
    private final FlagService flagService;
    public FlagController(FlagService flagService) {
        this.flagService = flagService;
    }


    @GetMapping("/{flagname}")    
    public ResponseEntity<FlagResponse> getFlagStatus(@PathVariable("flagname") String flagName) {
        String status = flagService.getFlagStatus(flagName);
        FlagResponse response = new FlagResponse(flagName, status);
        return ResponseEntity.ok(response);
    }
}
