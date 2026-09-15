package com.example.socialmedia.service;

import com.example.socialmedia.entity.Like;
import com.example.socialmedia.entity.Post;
import com.example.socialmedia.entity.User;
import com.example.socialmedia.repository.LikeRepository;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public LikeService(
            LikeRepository likeRepository,
            UserRepository userRepository,
            PostRepository postRepository) {

        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public String toggleLike(Long postId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new RuntimeException("Post not found"));

        var existingLike =
                likeRepository.findByUserAndPost(user, post);

        if (existingLike.isPresent()) {

            likeRepository.delete(existingLike.get());

            return "Post unliked successfully";

        } else {

            Like like = new Like(user, post);

            likeRepository.save(like);

            return "Post liked successfully";
        }
    }

    public long getLikeCount(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new RuntimeException("Post not found"));

        return likeRepository.countByPost(post);
    }
}