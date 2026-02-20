package com.example.backend.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.AssessmentSession;

@Repository
public interface AssessmentSessionRepository
        extends JpaRepository<AssessmentSession, Long> {

    // ユーザーの最新セッションを取得
    Optional<AssessmentSession>
    findTopByUserIdOrderByCreatedAtDesc(Long userId);

    // ユーザーの全セッション履歴
    List<AssessmentSession>
    findByUserIdOrderByCreatedAtDesc(Long userId);
}

