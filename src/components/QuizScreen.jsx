import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

export default function QuizScreen({ questions, currentIndex, userAnswers, onAnswer }) {
  const question = questions[currentIndex];

  const selectedAnswer = userAnswers[currentIndex] ?? null;

  return (
    <div className="screen quiz-screen">
      <div className="quiz-inner">
        <ProgressBar current={currentIndex} total={questions.length} />
        <QuestionCard
          question={question}
          selected={selectedAnswer}
          onAnswer={onAnswer}
        />
      </div>
    </div>
  );
}
