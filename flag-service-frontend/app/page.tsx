"use client";

import { useState, useEffect } from "react";
import { getFlag } from "@/api/api";
import FlagStatus from "@/components/FlagStatus";
import AdminReload from "@/components/AdminReload";

const FLAG_NAME = "flag-new-dashboard";

export default function Home() {
  const [flagStatus, setFlagStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFlag = async () => {
    try {
      setLoading(true);
      const data = await getFlag(FLAG_NAME);
      setFlagStatus(data.status);
    } catch {
      setFlagStatus("DISABLED");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlag();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Feature Flag Service</h1>

        <div className="card">
          <h2 className="card-title">Feature Status</h2>
          <FlagStatus status={flagStatus} loading={loading} />
        </div>

        <AdminReload onReloadSuccess={fetchFlag} />
      </div>
    </div>
  );
}
