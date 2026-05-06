export default function ReviewList({ questions, userAnswers }) {
  return (
    <div className="review-list">
      <h3 className="review-heading">Answer Review</h3>
      {questions.map((q, i) => {
        const isCorrect = userAnswers[i] === q.correct;
        return (
          <div key={i} className={`review-item ${isCorrect ? "review-correct" : "review-wrong"}`}>
            <div className="review-num">
              <span className="review-icon">{isCorrect ? "✓" : "✗"}</span>
              <span className="review-q-num">Q{i + 1}</span>
            </div>

            <div className="review-body">
              <p className="review-q-text" dangerouslySetInnerHTML={{ __html: q.question }} />

              <div className="review-answers">
                <span className="review-label">Your answer:</span>
                <span
                  className={`review-answer ${isCorrect ? "answer-right" : "answer-wrong-text"}`}
                  dangerouslySetInnerHTML={{ __html: userAnswers[i] }}
                />
              </div>

              {!isCorrect && (
                <div className="review-answers">
                  <span className="review-label">Correct answer:</span>
                  <span
                    className="review-answer answer-right"
                    dangerouslySetInnerHTML={{ __html: q.correct }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
