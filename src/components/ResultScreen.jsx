import ScoreBadge from "./ScoreBadge";
import ReviewList from "./ReviewList";

export default function ResultScreen({ questions, userAnswers, score, onRestart }) {
  return (
    <div className="screen result-screen">
      <div className="result-inner">
        <ScoreBadge score={score} total={questions.length} />

        <button className="restart-btn" onClick={onRestart}>
          Play Again
        </button>

        <ReviewList questions={questions} userAnswers={userAnswers} />
      </div>
    </div>
  );
}
