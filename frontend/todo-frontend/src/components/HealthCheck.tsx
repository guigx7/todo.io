import { useEffect, useState } from "react";
import axios from "axios";

export function HealthCheck() {
  const [status, setStatus] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("HealthCheck: iniciando fetch");
    axios
      .get("/api/health")
      .then((res) => {
        console.log("HealthCheck: dados recebidos", res.data);

        if (res.data && typeof res.data === "object" && "status" in res.data) {
          setStatus(res.data.status);
          setDetails(res.data.details ?? (res.data.components as any) ?? null);
        }
        // Se veio simplesmente uma string
        else if (typeof res.data === "string") {
          setStatus(res.data);
          setDetails(null);
        }
      })
      .catch((err) => {
        console.error("HealthCheck: erro no fetch", err);
        setError("Could not fetch health");
      });
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  if (status === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Health Check</h2>
      <p>
        Status:{" "}
        <span className={status === "UP" ? "text-green-600" : "text-red-600"}>
          {status}
        </span>
      </p>
      {details && (
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(details, null, 2)}
        </pre>
      )}
    </div>
  );
}
