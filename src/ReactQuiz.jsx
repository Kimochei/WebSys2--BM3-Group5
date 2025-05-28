import './App.css'
import QuestionNavigator from './QuestionNavigator';
import './QuestionNavigator.css';
import QuizResults from './QuizResults';
import './QuizResults.css';
import {useState, useEffect} from 'react';

// this quiz is temporary, please check if there's something I missed or did wrong

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false); 
    const [quizStarted, setQuizStarted] = useState(false); // New State -kim

    useEffect(() => {
        fetch('/data/react_questions.json')
            .then(res => res.json())
            .then(data => setQuestions(data))
            .catch(err => console.error('Failed to load questions:', err));
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({...answers, [questionId]: answer});
    };

    const handleNavigateToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
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

    const handleRestartQuiz = () => { // New Feature to Restart the quiz from the beginning - kim
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScore(0);
        setQuizCompleted(false);
    }

    const handleStartQuiz = () => {
        if (questions.length > 0) {
        setQuizStarted(true);
        setQuizCompleted(false);
        setCurrentQuestionIndex(0);
        setAnswers({});   
        setScore(0);          
        } else {
        console.warn("Questions are not loaded yet.")
        }
    };

    if (!quizStarted) {
        return (
            <div>
                <h2>Welcome to the React Quiz!</h2>
                <p>Click the button below to begin.</p>
                <button onClick={handleStartQuiz} disabled={questions.length === 0}>
                    {questions.length > 0 ? 'Start Quiz' : 'Loading Quiz...'}
                </button>
                {questions.length === 0 && <p>Please wait while questions are being prepared.</p>}
            </div>
        );
    }

    if (quizStarted && quizCompleted) {
        return (
            <QuizResults
                questions={questions}
                answers={answers}
                score={score}
                onRestartQuiz={handleRestartQuiz}
            />
        );
    }

    if (quizStarted && !quizCompleted) {
        if (!questions.length) {
            return <p>Loading questions...</p>; 
        }

        const question = questions[currentQuestionIndex];
        if (!question) {
            return <p>Loading question...</p>; 
        }


    const renderQuestion = () => {
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
                                            checked={String(answers[question.id]) === String(choice.id)}
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
                    return <p>Unsupported question type: {question.type}</p>;
            }
        };

        return (
            <div>
                <QuestionNavigator 
                totalQuestions={questions.length}
                currentQuestionIndex={currentQuestionIndex}
                onNavigate={handleNavigateToQuestion}/>

                <h2>React Quiz - Question {currentQuestionIndex + 1} of {questions.length}</h2>
                <h2>React Quiz</h2>
                {renderQuestion()}
                {questions[currentQuestionIndex] && (
                    <button onClick={handleSubmitAnswer} disabled={answers[questions[currentQuestionIndex].id] === undefined}>
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
                    </button>
                )}
            </div>
        );
    }

}

export default Quiz