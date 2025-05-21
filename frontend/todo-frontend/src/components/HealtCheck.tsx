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
    <div className="mt-4 p-4 shadow rounded-md max-w-sm mx-auto">
      <p className="text-center">
        Status da API: <strong>{status}</strong>
      </p>
    </div>
  );
}
