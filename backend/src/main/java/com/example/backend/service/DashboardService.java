package com.example.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.backend.dto.DashboardResponse;
import com.example.backend.entity.SkillAssessment;

@Service
public class DashboardService {

    private final AssessmentService assessmentService;

    public DashboardService(
            AssessmentService assessmentService
    ) {
        this.assessmentService = assessmentService;
    }

    public DashboardResponse getDashboard(Long userId) {

        boolean hasAssessment =
                assessmentService.hasAssessment(userId);

        Map<String, Integer> latestLevels = new HashMap<>();

        if (hasAssessment) {

            List<SkillAssessment> latest =
                    assessmentService.getLatestAssessments(userId);

            for (SkillAssessment a : latest) {
                latestLevels.put(
                        a.getCategory().name(), // ←ここ重要
                        a.getLevel()
                );
            }
        }

        return new DashboardResponse(
                hasAssessment,
                latestLevels
        );
    }

}

