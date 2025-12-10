package com.enya.flagservice.dto;

public class FlagResponse {
    private String flagName;
    private String status;

    public FlagResponse(String flagName, String status) {
        this.flagName = flagName;
        this.status = status;
    }

    public String getFlagName() {
        return flagName;
    }

    public String getStatus() {
        return status;
    }
}

