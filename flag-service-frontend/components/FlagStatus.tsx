interface FlagStatusProps {
  status: string;
  loading: boolean;
}

export default function FlagStatus({ status, loading }: FlagStatusProps) {
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (status === "ENABLED") {
    return (
      <div>
        <p className="feature-message feature-enabled">
          New Dashboard is Active
        </p>
        <button className="btn btn-green">Enable Dashboard</button>
      </div>
    );
  }

  return (
    <div>
      <p className="feature-message feature-disabled">Dashboard is Legacy</p>
      <button className="btn btn-gray">Feature Disabled</button>
    </div>
  );
}
