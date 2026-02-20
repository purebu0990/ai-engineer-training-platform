package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.AssessmentSession;
import com.example.backend.entity.SkillAssessment;

@Repository
public interface SkillAssessmentRepository
        extends JpaRepository<SkillAssessment, Long> {

    // セッション単位で取得
    List<SkillAssessment>
    findBySession(AssessmentSession session);

    // ユーザーの全診断結果
    List<SkillAssessment>
    findByUserId(Long userId);

    // カテゴリ別履歴（成長分析用）
    List<SkillAssessment>
    findByUserIdAndCategoryOrderByCreatedAtAsc(
            Long userId,
            String category
    );
}
