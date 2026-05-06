import AnswerOption from "./AnswerOption";

export default function QuestionCard({ question, selected, onAnswer }) {
  return (
    <div className="question-card">
      <div className="q-meta">
        <span className="q-category">{question.category}</span>
        <span className={`q-difficulty diff-${question.difficulty}`}>
          {question.difficulty}
        </span>
      </div>

      <p
        className="q-text"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <div className="options-grid">
        {question.options.map((opt) => (
          <AnswerOption
            key={opt}
            text={opt}
            correct={question.correct}
            selected={selected}
            onSelect={onAnswer}
          />
        ))}
      </div>
    </div>
  );
}
