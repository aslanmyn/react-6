// src/pages/Profile.jsx
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <section className="page page--centered">
            <div className="card profile-wide">
                <h1 className="profile-title">Profile</h1>

                <div className="profile-info">
                    <div className="row">
                        <span className="label">Email</span>
                        <span className="value">{user.email}</span>
                    </div>

                    <div className="row">
                        <span className="label">UID</span>
                        <span className="uid-box">{user.uid}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
