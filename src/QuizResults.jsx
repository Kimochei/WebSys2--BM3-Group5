import React from 'react';
import './QuizResults.css'; 

const getAnswerText = (question, answerValue) => {
    if (answerValue === undefined || answerValue === null) {
        return "Not answered";
    }
    switch (question.type) {
        case 'multiple': {
            const choice = question.choices.find(c => String(c.id) === String(answerValue));
            return choice ? choice.value : "Invalid choice";
        }
        case 'binary':
            return String(answerValue) === 'true' ? 'True' : 'False';
        case 'identification':
            return String(answerValue); // The answer itself is the text
        default:
            return String(answerValue);
    }
};

function QuizResults({ questions, answers, score, onRestartQuiz }) {
    if (!questions || questions.length === 0) {
        return <p>No questions available for review.</p>;
    }

    return (
        <div className="quiz-results container">
            <h2>Quiz Results</h2>
            <p className="score">Your final score: {score} / {questions.length}</p>
            
            <div className="results-breakdown">
                {questions.map((question, index) => {
                    const userAnswerValue = answers[question.id];
                    const correctAnswerValue = question.answer;
                    const isCorrect = String(userAnswerValue).toLowerCase() === String(correctAnswerValue).toLowerCase();

                    const userAnswerText = getAnswerText(question, userAnswerValue);
                    const correctAnswerText = getAnswerText(question, correctAnswerValue);

                    return (
                        <div key={question.id} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                            <h3>Question {index + 1}: {question.question}</h3>
                            <p>Your answer: <span className=" user-answer">{userAnswerText}</span></p>
                            {!isCorrect && (
                                <p>Correct answer: <span className=" correct-answer">{correctAnswerText}</span></p>
                            )}
                            <p className="status">{isCorrect ? " Status: Correct" : " Status: Incorrect"}</p>
                        </div>
                    );
                })}
            </div>

            <button onClick={onRestartQuiz} className="restart-button">
                Restart Quiz
            </button>
        </div>
    );
}

export default QuizResults;