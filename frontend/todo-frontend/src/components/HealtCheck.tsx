import { useEffect, useState } from "react";
import { getHealth } from "../api/health";

export function HealtCheck() {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    getHealth()
      .then((data) => setStatus(data))
      .catch(() => setStatus("DOWN"));
  }, []);

  return (
    <div className="bg-cyan-400">
      <p>
        Status da API: <strong>{status}</strong>
      </p>
    </div>
  );
}
