import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submitData = async () => {

    try {

      setError("");

      const data = input
        .split(",")
        .map(item => item.trim())
        .filter(item => item);

      const response = await axios.post(
        " https://chitkara-round1-hierarchy-api-2.onrender.com",
        { data }
      );

      setResult(response.data);

    } catch (err) {

      setError("Failed to connect to API");
    }
  };

  return (
    <div className="container">

      <h1>Hierarchy Analyzer</h1>

      <textarea
        rows="10"
        placeholder="A->B,A->C,B->D"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={submitData}>
        Analyze
      </button>

      {error && (
        <p className="error">{error}</p>
      )}

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </div>
  );
}

export default App;