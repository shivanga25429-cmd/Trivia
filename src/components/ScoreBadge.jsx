export default function ScoreBadge({ score, total }) {
  const percent = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percent === 100) return "Perfect score! 🎉";
    if (percent >= 80)  return "Excellent work! 🌟";
    if (percent >= 60)  return "Good job! 👍";
    if (percent >= 40)  return "Not bad, keep going! 💪";
    return "Keep practicing! 📚";
  };

  const getColorClass = () => {
    if (percent >= 80) return "score-great";
    if (percent >= 50) return "score-ok";
    return "score-poor";
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="score-badge">
      <div className={`score-ring-wrap ${getColorClass()}`}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill="none" strokeWidth="8" className="ring-bg" />
          <circle
            cx="70" cy="70" r={radius}
            fill="none" strokeWidth="8"
            className="ring-fg"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
          />
          <text x="70" y="65" textAnchor="middle" className="ring-score">
            {score}/{total}
          </text>
          <text x="70" y="85" textAnchor="middle" className="ring-pct">
            {percent}%
          </text>
        </svg>
      </div>
      <p className="score-message">{getMessage()}</p>
    </div>
  );
}
