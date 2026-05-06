import { useState } from "react";
import CategoryPicker from "./CategoryPicker";

export default function SetupScreen({ onStart, loading, error }) {
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [amount, setAmount] = useState(10);

  function handleSubmit() {
    onStart({ category, difficulty, amount });
  }

  return (
    <div className="screen setup-screen">
      <div className="setup-card">
        <div className="setup-header">
          <div className="trophy-icon">🧠</div>
          <h1 className="setup-title">Trivia Quiz</h1>
          <p className="setup-sub">Test your knowledge across any topic</p>
        </div>

        <div className="setup-fields">
          <CategoryPicker value={category} onChange={setCategory} />

          <div className="field">
            <label className="field-label">Difficulty</label>
            <div className="pill-group">
              {["any", "easy", "medium", "hard"].map((d) => (
                <button
                  key={d}
                  className={`pill ${difficulty === d ? "pill-active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d === "any" ? "Any" : d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="field-label">
              Questions: <span className="amount-display">{amount}</span>
            </label>
            <input
              type="range"
              min={5}
              max={20}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="range-input"
            />
            <div className="range-labels">
              <span>5</span>
              <span>20</span>
            </div>
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button
          className="start-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="loading-dots">
              <span /><span /><span />
            </span>
          ) : (
            "Start Quiz →"
          )}
        </button>
      </div>
    </div>
  );
}
