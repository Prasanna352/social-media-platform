import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get("/profile");

                setProfile(response.data);

            } catch (err) {

                console.error(err);
                setError("Failed to load profile.");

            } finally {

                setLoading(false);
            }
        };

        fetchProfile();

    }, []);

    if (loading) {
        return (
            <main className="profile-page">
                <div className="profile-container">
                    <div className="status-message">
                        Loading profile...
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="profile-page">
                <div className="profile-container">
                    <div className="status-error">
                        {error}
                    </div>
                </div>
            </main>
        );
    }

    if (!profile) {
        return (
            <main className="profile-page">
                <div className="profile-container">
                    <div className="empty-state">
                        <h3>Profile not found</h3>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="profile-page">

            <div className="profile-container">

                <section className="profile-card">

                    <div className="profile-avatar">
                        {profile.name
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <div className="profile-info">

                        <h1>{profile.name}</h1>

                        <p>{profile.email}</p>

                        <span>
                            User ID: {profile.id}
                        </span>

                    </div>

                </section>

                <section className="profile-posts">

                    <div className="profile-posts-header">

                        <h2>My Posts</h2>

                        <span>
                            {profile.posts.length}{" "}
                            {profile.posts.length === 1
                                ? "post"
                                : "posts"}
                        </span>

                    </div>

                    {profile.posts.length === 0 ? (

                        <div className="empty-state">
                            <h3>No posts yet</h3>
                            <p>
                                Your posts will appear here.
                            </p>
                        </div>

                    ) : (

                        profile.posts.map((post) => (

                            <article
                                className="profile-post-card"
                                key={post.id}
                            >

                                <div className="profile-post-header">

                                    <div className="small-avatar">
                                        {profile.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <strong>
                                            {profile.name}
                                        </strong>

                                        <small>
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleString()}
                                        </small>
                                    </div>

                                </div>

                                <p className="profile-post-content">
                                    {post.content}
                                </p>

                            </article>

                        ))
                    )}

                </section>

            </div>

        </main>
    );
}

export default Profile;