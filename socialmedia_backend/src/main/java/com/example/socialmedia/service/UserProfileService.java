package com.example.socialmedia.service;

import com.example.socialmedia.dto.PostResponse;
import com.example.socialmedia.dto.UserProfileResponse;
import com.example.socialmedia.entity.Post;
import com.example.socialmedia.entity.User;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProfileService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public UserProfileService(
            UserRepository userRepository,
            PostRepository postRepository) {

        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public UserProfileResponse getMyProfile(
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<PostResponse> posts =
                postRepository
                        .findByUserOrderByCreatedAtDesc(user)
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                posts
        );
    }

    private PostResponse convertToResponse(
            Post post) {

        return new PostResponse(
                post.getId(),
                post.getContent(),
                post.getCreatedAt(),
                post.getUser().getId(),
                post.getUser().getName(),
                post.getUser().getEmail()
        );
    }
}