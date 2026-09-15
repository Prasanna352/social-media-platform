import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Comments from "../components/Comments";

function Feed() {

    const [posts, setPosts] = useState([]);
    const [likeCounts, setLikeCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentEmail = localStorage.getItem("email");

    const fetchPosts = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/posts");

            setPosts(response.data);

            const counts = {};

            await Promise.all(
                response.data.map(async (post) => {

                    const likeResponse = await api.get(
                        `/posts/${post.id}/likes`
                    );

                    counts[post.id] = likeResponse.data;
                })
            );

            setLikeCounts(counts);

        } catch (err) {

            console.error(err);
            setError("Failed to load posts.");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = (newPost) => {

        setPosts((currentPosts) => [
            newPost,
            ...currentPosts
        ]);

        setLikeCounts((currentCounts) => ({
            ...currentCounts,
            [newPost.id]: 0
        }));
    };

    const handleLike = async (postId) => {

        try {

            await api.post(
                `/posts/${postId}/like`
            );

            const response = await api.get(
                `/posts/${postId}/likes`
            );

            setLikeCounts((currentCounts) => ({
                ...currentCounts,
                [postId]: response.data
            }));

        } catch (err) {

            console.error(err);
            setError("Failed to like/unlike post.");
        }
    };

    const handleDelete = async (postId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/posts/${postId}`
            );

            setPosts((currentPosts) =>
                currentPosts.filter(
                    (post) => post.id !== postId
                )
            );

            setLikeCounts((currentCounts) => {

                const updatedCounts = {
                    ...currentCounts
                };

                delete updatedCounts[postId];

                return updatedCounts;
            });

        } catch (err) {

            console.error(err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to delete post.");
            }
        }
    };

    return (
        <>

            <Navbar />

            <main className="feed-page">

                <div className="feed-container">

                    <div className="feed-header">
                        <h1>Home Feed</h1>
                        <p>
                            See what's happening in your community
                        </p>
                    </div>

                    <CreatePost
                        onPostCreated={handlePostCreated}
                    />

                    {loading && (
                        <div className="status-message">
                            Loading posts...
                        </div>
                    )}

                    {error && (
                        <div className="status-error">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        posts.length === 0 && (

                            <div className="empty-state">
                                <h3>No posts yet</h3>
                                <p>
                                    Be the first person to share something!
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        posts.map((post) => (

                            <article
                                className="post-card"
                                key={post.id}
                            >

                                <div className="post-header">

                                    <div className="user-avatar">
                                        {post.userName
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="post-user-info">

                                        <strong>
                                            {post.userName}
                                        </strong>

                                        <small>
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleString()}
                                        </small>

                                    </div>

                                </div>

                                <div className="post-content">
                                    {post.content}
                                </div>

                                <div className="post-actions">

                                    <button
                                        className="like-button"
                                        onClick={() =>
                                            handleLike(post.id)
                                        }
                                    >
                                        ❤️ Like
                                    </button>

                                    <span className="like-count">
                                        {likeCounts[post.id] || 0} likes
                                    </span>

                                    {post.userEmail === currentEmail && (
                                        <button
                                            className="delete-post-button"
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}

                                </div>

                                <Comments
                                    postId={post.id}
                                />

                            </article>

                        ))}

                </div>

            </main>

        </>
    );
}

export default Feed;