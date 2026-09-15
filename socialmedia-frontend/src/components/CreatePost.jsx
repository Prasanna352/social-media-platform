import { useState } from "react";
import api from "../services/api";

function CreatePost({ onPostCreated }) {

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!content.trim()) {
            setError("Post content cannot be empty");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await api.post("/posts", {
                content: content
            });

            onPostCreated(response.data);

            setContent("");

        } catch (err) {

            console.error(err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to create post.");
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="create-post-card">

            <h2>Create a Post</h2>

            <form onSubmit={handleSubmit}>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    maxLength="2000"
                    rows="4"
                />

                <div className="create-post-footer">

                    <span>
                        {content.length}/2000
                    </span>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>

                </div>

            </form>

            {error && (
                <p className="create-post-error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default CreatePost;