"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error ?? "Login gagal");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/WIZTR text.svg" alt="WIZTR" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span className="admin-login-brand">WIZTR</span>
        </div>

        <h1>Admin Panel</h1>
        <p className="admin-login-subtitle">Masuk untuk mengelola katalog produk</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              autoComplete="username"
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button
            type="submit"
            id="btn-login"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="admin-spinner" />
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
