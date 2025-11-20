// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
    const { signup } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState({ loading: false, error: "" });

    async function handleSubmit(e) {
        e.preventDefault();
        setState({ loading: true, error: "" });

        try {
            await signup(email, password);
            nav("/profile", { replace: true });
        } catch (err) {
            setState({
                loading: false,
                error: err.message || "Signup failed",
            });
            return;
        }

        setState({ loading: false, error: "" });
    }

    return (
        <section>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={state.loading}>
                    {state.loading ? "Loading..." : "Create account"}
                </button>

                {state.error && (
                    <p style={{ color: "#c62828", marginTop: 8 }}>{state.error}</p>
                )}
            </form>

            <p style={{ marginTop: 12 }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </section>
    );
}
