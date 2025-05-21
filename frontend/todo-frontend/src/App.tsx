import { useEffect, useState } from "react";
import { getHealth } from "./api/health";

function App() {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    getHealth()
      .then((data) => setStatus(data))
      .catch(() => setStatus("DOWN"));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Health Check</h1>
      <p>
        Status da API: <strong>{status}</strong>
      </p>
    </div>
  );
}

export default App;
