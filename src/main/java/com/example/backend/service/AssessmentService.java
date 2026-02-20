package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.AssessmentSession;
import com.example.backend.entity.SkillAssessment;
import com.example.backend.repository.AssessmentSessionRepository;
import com.example.backend.repository.SkillAssessmentRepository;

@Service
public class AssessmentService {

    private final AssessmentSessionRepository sessionRepository;
    private final SkillAssessmentRepository assessmentRepository;

    public AssessmentService(
            AssessmentSessionRepository sessionRepository,
            SkillAssessmentRepository assessmentRepository
    ) {
        this.sessionRepository = sessionRepository;
        this.assessmentRepository = assessmentRepository;
    }

    // =====================================
    // ① セッション作成
    // =====================================
    public AssessmentSession createSession(Long userId) {
        AssessmentSession session = new AssessmentSession();
        session.setUserId(userId);
        return sessionRepository.save(session);
    }

    // =====================================
    // ② 診断保存（最重要）
    // =====================================
    @Transactional
    public void saveAssessments(
            Long userId,
            List<SkillAssessment> assessments
    ) {

        // 新しいセッション作成
        AssessmentSession session = createSession(userId);

        // 各診断にsessionとuserを設定
        for (SkillAssessment assessment : assessments) {
            assessment.setUserId(userId);
            assessment.setSession(session);
        }

        assessmentRepository.saveAll(assessments);
    }

    // =====================================
    // ③ 最新セッション取得
    // =====================================
    public Optional<AssessmentSession>
    getLatestSession(Long userId) {

        return sessionRepository
                .findTopByUserIdOrderByCreatedAtDesc(userId);
    }

    // =====================================
    // ④ 最新診断結果取得
    // =====================================
    public List<SkillAssessment>
    getLatestAssessments(Long userId) {

        Optional<AssessmentSession> sessionOpt =
                getLatestSession(userId);

        return sessionOpt
                .map(assessmentRepository::findBySession)
                .orElse(List.of());
    }

    // =====================================
    // ⑤ 診断済みかチェック（Dashboard用）
    // =====================================
    public boolean hasAssessment(Long userId) {
        return getLatestSession(userId).isPresent();
    }
}

