package com.enya.flagservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class FlagService {
    private final Map<String, String> flagMap = new HashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void loadFlags() {
        readFlagFile();
        System.out.println(flagMap);
    }

    public void readFlagFile() {
        try {
            InputStream inputStream = getClass()
                .getClassLoader()
                .getResourceAsStream("flag.json");

            if (inputStream == null) {
                throw new IOException("flag.json not found in classpath!");
            }

            Map<String, String> loadedFlags = objectMapper.readValue(
                inputStream,
                new TypeReference<Map<String, String>>() {}
            );
          
            flagMap.putAll(loadedFlags);
        } catch (IOException e) {
            System.err.println("Failed to load flags: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public String getFlagStatus(String flagname) {
        return flagMap.getOrDefault(flagname, "Default");
    }


    public synchronized void reloadFlags() {
        flagMap.clear();
        readFlagFile();
    }
}
