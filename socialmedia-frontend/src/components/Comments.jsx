import { useEffect, useState } from "react";
import api from "../services/api";

function Comments({ postId }) {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const currentEmail = localStorage.getItem("email");

    const fetchComments = async () => {

        try {

            const response = await api.get(
                `/posts/${postId}/comments`
            );

            setComments(response.data);

        } catch (err) {

            console.error(err);
            setError("Failed to load comments.");

        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!content.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await api.post(
                `/posts/${postId}/comments`,
                {
                    content: content
                }
            );

            setComments((currentComments) => [
                ...currentComments,
                response.data
            ]);

            setContent("");

        } catch (err) {

            console.error(err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to add comment.");
            }

        } finally {

            setLoading(false);
        }
    };

    const handleDelete = async (commentId) => {

        try {

            setError("");

            await api.delete(
                `/posts/comments/${commentId}`
            );

            setComments((currentComments) =>
                currentComments.filter(
                    (comment) => comment.id !== commentId
                )
            );

        } catch (err) {

            console.error(err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to delete comment.");
            }
        }
    };

    return (
        <div className="comments-section">

            <h4>Comments</h4>

            <form
                className="comment-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    placeholder="Write a comment..."
                    maxLength="1000"
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Comment"}
                </button>

            </form>

            {error && (
                <p className="comment-error">
                    {error}
                </p>
            )}

            {comments.length === 0 ? (

                <p className="no-comments">
                    No comments yet.
                </p>

            ) : (

                <div className="comments-list">

                    {comments.map((comment) => (

                        <div
                            className="comment-item"
                            key={comment.id}
                        >

                            <div className="comment-avatar">
                                {comment.userName
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="comment-body">

                                <div className="comment-top">

                                    <strong>
                                        {comment.userName}
                                    </strong>

                                    {comment.userEmail === currentEmail && (
                                        <button
                                            className="delete-comment-button"
                                            onClick={() =>
                                                handleDelete(
                                                    comment.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}

                                </div>

                                <p>
                                    {comment.content}
                                </p>

                                <small>
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleString()}
                                </small>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Comments;