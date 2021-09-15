import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/cdn-cgi/access/get-identity");
        const data = await response.json();

        setUser(JSON.stringify(data, null, 2));
      } catch {
        setError("Not under cloudflare access");
      }
    };

    getUser();
  });

  return (
    <div className="App">
      {error ? (
        error
      ) : user ? (
        <div>
          <pre>{user}</pre>
          <br />
          <a href="/cdn-cgi/access/logout">Logout</a>
        </div>
      ) : (
        "...Loading"
      )}
    </div>
  );
}
