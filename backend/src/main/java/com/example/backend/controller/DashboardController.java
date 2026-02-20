package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.DashboardResponse;
import com.example.backend.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    private Long getUserId(Authentication auth) {

        try {
            return Long.parseLong(auth.getName());
        } catch (NumberFormatException e) {
            throw new IllegalStateException(
                    "Invalid user ID in JWT"
            );
        }
    }

    @GetMapping
    public ResponseEntity<DashboardResponse>
    getDashboard(Authentication auth) {

        Long userId = getUserId(auth);

        DashboardResponse response =
                dashboardService.getDashboard(userId);

        return ResponseEntity.ok(response);
    }
}

