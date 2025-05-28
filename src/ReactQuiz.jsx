import './App.css'

import {useState, useEffect} from 'react';

// this quiz is temporary, please check if there's something I missed or did wrong

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        fetch('/data/react_questions.json')
            .then(res => res.json())
            .then(data => setQuestions(data))
            .catch(err => console.error('Failed to load questions:', err));
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({...answers, [questionId]: answer});
    };

    const handleSubmitAnswer = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Quiz is complete - calculate score
            let calculatedScore = 0;
            questions.forEach(question => {
                if (answers[question.id] && String(answers[question.id]) === String(question.answer)) {
                    calculatedScore++;
                }
            });
            setScore(calculatedScore);
            setQuizCompleted(true);
        }
    };


    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];

        if (!question) {
            return <p>Loading...</p>; // Or handle loading state differently
        }

        switch (question.type) {
            case 'multiple':
                return (
                    <div>
                        <p>{question.question}</p>
                        {question.choices.map(choice => (
                            <div key={choice.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={choice.id}
                                        checked={answers[question.id] === choice.id}
                                        onChange={() => handleAnswerChange(question.id, choice.id)}
                                    />
                                    {choice.value}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'binary':
                return (
                    <div>
                        <p>{question.question}</p>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value="true"
                                    checked={answers[question.id] === 'true'}
                                    onChange={() => handleAnswerChange(question.id, 'true')}
                                />
                                True
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value="false"
                                    checked={answers[question.id] === 'false'}
                                    onChange={() => handleAnswerChange(question.id, 'false')}
                                />
                                False
                            </label>
                        </div>
                    </div>
                );
            case 'identification':
                return (
                    <div>
                        <p>{question.question}</p>
                        <input
                            type="text"
                            value={answers[question.id] || ''}
                            onChange={e => handleAnswerChange(question.id, e.target.value)}
                        />
                    </div>
                );
            default:
                return <p>Unsupported question type.</p>;
        }
    };

    if (quizCompleted) {
        return (
            <div>
                <h2>Quiz Completed!</h2>
                <p>Your score: {score} / {questions.length}</p>
            </div>
        );
    }


    return (
        <div>
            <h2>React Quiz</h2>
            {renderQuestion()}
            <button onClick={handleSubmitAnswer}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
            </button>
        </div>
    );
}

export default Quiz