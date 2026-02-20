package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.SkillAssessment;
import com.example.backend.service.AssessmentService;

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    // =====================================
    // JWTからuserId取得（共通処理）
    // =====================================
    private Long getUserId(Authentication authentication) {

        // ★ あなたのJWT実装に合わせて調整
        // 例：principalにuserIdが入っている場合

        return Long.valueOf(authentication.getName());
    }

    // =====================================
    // 診断結果保存
    // POST /api/assessment
    // =====================================
    @PostMapping
    public ResponseEntity<?> saveAssessment(
            Authentication authentication,
            @RequestBody List<SkillAssessment> assessments
    ) {

        Long userId = getUserId(authentication);

        assessmentService.saveAssessments(userId, assessments);

        return ResponseEntity.ok("Assessment saved");
    }

    // =====================================
    // 最新診断取得
    // GET /api/assessment/latest
    // =====================================
    @GetMapping("/latest")
    public ResponseEntity<?> getLatestAssessment(
            Authentication authentication
    ) {

        Long userId = getUserId(authentication);

        List<SkillAssessment> latest =
                assessmentService.getLatestAssessments(userId);

        return ResponseEntity.ok(latest);
    }

    // =====================================
    // 診断済みチェック（Dashboard用）
    // GET /api/assessment/status
    // =====================================
    @GetMapping("/status")
    public ResponseEntity<?> getAssessmentStatus(
            Authentication authentication
    ) {

        Long userId = getUserId(authentication);

        boolean hasAssessment =
                assessmentService.hasAssessment(userId);

        return ResponseEntity.ok(hasAssessment);
    }
}

