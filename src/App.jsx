import { useTrivia } from "./hooks/useTrivia";
import SetupScreen from "./components/SetupScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import "./App.css";

export default function App() {
  const {
    screen,
    questions,
    userAnswers,
    currentIndex,
    loading,
    error,
    score,
    fetchQuestions,
    answerQuestion,
    restart,
  } = useTrivia();

  return (
    <div className="app">
      {screen === "setup" && (
        <SetupScreen
          onStart={fetchQuestions}
          loading={loading}
          error={error}
        />
      )}

      {screen === "quiz" && (
        <QuizScreen
          questions={questions}
          currentIndex={currentIndex}
          userAnswers={userAnswers}
          onAnswer={answerQuestion}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          onRestart={restart}
        />
      )}
    </div>
  );
}
