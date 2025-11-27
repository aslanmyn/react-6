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
        <section className="page page--centered">
            <div className="card auth-card">
                <h1 className="page-title">Create account</h1>
                <p className="page-subtitle">
                    Sign up to save your favourite products and manage your profile.
                </p>

                <form className="form" onSubmit={handleSubmit}>
                    <label className="field">
                        <span className="field-label">Email</span>
                        <input
                            type="email"
                            className="field-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className="field">
                        <span className="field-label">Password</span>
                        <input
                            type="password"
                            className="field-input"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {state.error && (
                        <p className="form-error">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        className="btn btn--primary btn--full"
                        disabled={state.loading}
                    >
                        {state.loading ? "Creating…" : "Sign up"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="link">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
}
