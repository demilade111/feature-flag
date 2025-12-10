"use client";

import { useState } from "react";
import { reloadFlags } from "@/api/api";

interface AdminReloadProps {
  onReloadSuccess: () => void;
}

export default function AdminReload({ onReloadSuccess }: AdminReloadProps) {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Loading...");

    try {
      const success = await reloadFlags(username, password);
      if (success) {
        setStatus("Reload successful!");
        onReloadSuccess();
      } else {
        setStatus("Reload failed: Unauthorized");
      }
    } catch {
      setStatus("Reload failed: Network error");
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Admin: Reload Flags</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="btn btn-blue">
          Reload Flags
        </button>
        {status && (
          <p
            className={
              status.includes("successful")
                ? "status-message status-success"
                : "status-message status-error"
            }
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
