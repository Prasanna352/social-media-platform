package com.example.socialmedia.service;

import com.example.socialmedia.dto.CommentResponse;
import com.example.socialmedia.entity.Comment;
import com.example.socialmedia.entity.Post;
import com.example.socialmedia.entity.User;
import com.example.socialmedia.repository.CommentRepository;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentService(
            CommentRepository commentRepository,
            UserRepository userRepository,
            PostRepository postRepository) {

        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public CommentResponse addComment(
            Long postId,
            String email,
            String content) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Post post = postRepository
                .findById(postId)
                .orElseThrow(() ->
                        new RuntimeException("Post not found"));

        Comment comment = new Comment();

        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUser(user);
        comment.setPost(post);

        Comment savedComment =
                commentRepository.save(comment);

        return convertToResponse(savedComment);
    }

    public List<CommentResponse> getComments(
            Long postId) {

        Post post = postRepository
                .findById(postId)
                .orElseThrow(() ->
                        new RuntimeException("Post not found"));

        return commentRepository
                .findByPostOrderByCreatedAtAsc(post)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public void deleteComment(
            Long commentId,
            String email) {

        Comment comment = commentRepository
                .findById(commentId)
                .orElseThrow(() ->
                        new RuntimeException("Comment not found"));

        if (!comment.getUser().getEmail().equals(email)) {

            throw new RuntimeException(
                    "You can delete only your own comments"
            );
        }

        commentRepository.delete(comment);
    }

    private CommentResponse convertToResponse(
            Comment comment) {

        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUser().getId(),
                comment.getUser().getName(),
                comment.getUser().getEmail(),
                comment.getPost().getId()
        );
    }
}