import { useState, useCallback } from "react";
function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function useTrivia() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [screen, setScreen] = useState("setup");


  const fetchQuestions = useCallback(async ({ category, difficulty, amount }) => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
      if (category !== "any") url += `&category=${category}`;
      if (difficulty !== "any") url += `&difficulty=${difficulty}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code !== 0) {
        throw new Error("Not enough questions for these settings. Try different options.");
      }


      const processed = data.results.map((q) => ({
        question: decodeHTML(q.question),
        correct: decodeHTML(q.correct_answer),
        options: shuffle([
          ...q.incorrect_answers.map(decodeHTML),
          decodeHTML(q.correct_answer),
        ]),
        category: decodeHTML(q.category),
        difficulty: q.difficulty,
      }));

      setQuestions(processed);
      setUserAnswers([]);
      setCurrentIndex(0);
      setScreen("quiz");
    } catch (err) {
      setError(err.message || "Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);


  const answerQuestion = useCallback((answer) => {
    setUserAnswers((prev) => [...prev, answer]);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= questions.length) {
          setScreen("result");
        }
        return next;
      });
    }, 900);
  }, [questions.length]);

  const score = questions.reduce((acc, q, i) => {
    return userAnswers[i] === q.correct ? acc + 1 : acc;
  }, 0);

  const restart = useCallback(() => {
    setScreen("setup");
    setQuestions([]);
    setUserAnswers([]);
    setCurrentIndex(0);
    setError(null);
  }, []);

  return {
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
  };
}
