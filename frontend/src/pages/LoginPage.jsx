import React, { useState } from "react";
import { Logo } from "../components/Logo";
import { Google } from "../icons";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex items-center justify-center">
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[repeating-linear-gradient(rgba(212,168,67,0.03)_0px,rgba(212,168,67,0.03)_1px,transparent_1px,transparent_48px),repeating-linear-gradient(90deg,rgba(212,168,67,0.03)_0px,rgba(212,168,67,0.03)_1px,transparent_1px,transparent_48px)]" />
      <div className="w-full max-w-[400px] px-5 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"><Logo onClick={() => navigate("/")} /></div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-1.5 font-sans">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted font-normal">
            {isSignup ? "Start sending campaigns in minutes." : "Sign in to your Velo dashboard."}
          </p>
        </div>
        <div className="card p-7">
          <button onClick={handleSubmit} className="ghost-btn w-full py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2.5 mb-5">
            <Google /> Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted font-mono">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-col gap-3.5">
            {isSignup && (
              <div>
                <label className="form-label">Full name</label>
                <input className="input-field" type="text" placeholder="Alex Kumar" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div>
              <label className="form-label">Email</label>
              <input className="input-field" type="email" placeholder="alex@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input className="input-field" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="gold-btn w-full py-3 rounded-lg text-[15px] mt-1" onClick={handleSubmit}>
              {isSignup ? "Create account" : "Sign in"}
            </button>
          </div>
        </div>
        <p className="text-center mt-4.5 text-sm text-muted">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span className="text-gold cursor-pointer font-bold" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};