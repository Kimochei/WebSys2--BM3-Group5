import React from 'react';
import './QuestionNavigator.css'; // We'll create this CSS file next

function QuestionNavigator({ totalQuestions, currentQuestionIndex, onNavigate }) {
    const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i);

    if (totalQuestions === 0) {
        return null; // doesnt render if no questions
    }

    return (
        <div className="question-navigator">
            {questionNumbers.map((index) => (
                <button
                    key={index}
                    className={`
                        nav-button 
                        ${index === currentQuestionIndex ? 'current' : ''}
                    `}
                    onClick={() => onNavigate(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default QuestionNavigator;