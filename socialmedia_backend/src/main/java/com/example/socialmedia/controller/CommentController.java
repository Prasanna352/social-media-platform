package com.example.socialmedia.controller;

import com.example.socialmedia.dto.CommentRequest;
import com.example.socialmedia.dto.CommentResponse;
import com.example.socialmedia.service.CommentService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        CommentResponse comment =
                commentService.addComment(
                        postId,
                        email,
                        request.getContent()
                );

        return ResponseEntity.ok(comment);
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(
            @PathVariable Long postId) {

        return ResponseEntity.ok(
                commentService.getComments(postId)
        );
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication) {

        String email = authentication.getName();

        commentService.deleteComment(
                commentId,
                email
        );

        return ResponseEntity.ok(
                "Comment deleted successfully"
        );
    }
}