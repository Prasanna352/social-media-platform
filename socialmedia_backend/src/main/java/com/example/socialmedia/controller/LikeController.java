package com.example.socialmedia.controller;

import com.example.socialmedia.service.LikeService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> toggleLike(
            @PathVariable Long postId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                likeService.toggleLike(postId, email)
        );
    }

    @GetMapping("/{postId}/likes")
    public ResponseEntity<Long> getLikeCount(
            @PathVariable Long postId) {

        return ResponseEntity.ok(
                likeService.getLikeCount(postId)
        );
    }
}