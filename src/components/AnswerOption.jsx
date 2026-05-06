export default function AnswerOption({ text, correct, selected, onSelect }) {
  const isAnswered = selected !== null;
  const isThisSelected = selected === text;
  const isCorrect = text === correct;

  let stateClass = "";
  if (isAnswered) {
    if (isCorrect) stateClass = "option-correct";
    else if (isThisSelected) stateClass = "option-wrong";
    else stateClass = "option-dim";
  }

  return (
    <button
      className={`answer-option ${stateClass}`}
      onClick={() => !isAnswered && onSelect(text)}
      disabled={isAnswered}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
