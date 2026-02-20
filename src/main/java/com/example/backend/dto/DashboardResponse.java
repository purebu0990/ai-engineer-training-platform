package com.example.backend.dto;

import java.util.Map;

public class DashboardResponse {

    private boolean hasAssessment;
    private Map<String, Integer> latestLevels;

    public DashboardResponse(
            boolean hasAssessment,
            Map<String, Integer> latestLevels
    ) {
        this.hasAssessment = hasAssessment;
        this.latestLevels = latestLevels;
    }

    public boolean isHasAssessment() {
        return hasAssessment;
    }

    public Map<String, Integer> getLatestLevels() {
        return latestLevels;
    }
}

