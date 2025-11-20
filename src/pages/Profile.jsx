// src/pages/Profile.jsx
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    return (
        <section>
            <h1>Profile</h1>

            {!user && <p>No user data.</p>}

            {user && (
                <ul>
                    <li>
                        <strong>Email:</strong> {user.email}
                    </li>
                    <li>
                        <strong>UID:</strong> {user.uid}
                    </li>
                </ul>
            )}
        </section>
    );
}
