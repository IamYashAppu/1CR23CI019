import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]); // To track user answers

  const quizData = [
    {
      question: "Which keyword is used to declare a constant variable in JavaScript?",
      options: ["var", "let", "const", "constant"],
      correctAnswer: "const"
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: "push()"
    },
    {
      question: "What does the 'this' keyword refer to in a method of an object?",
      options: ["The global object", "The object that owns the method", "The function itself", "Undefined"],
      correctAnswer: "The object that owns the method"
    },
    {
      question: "Which ES6 feature allows you to extract values from arrays or properties from objects?",
      options: ["Template literals", "Arrow functions", "Destructuring", "Spread operator"],
      correctAnswer: "Destructuring"
    },
    {
      question: "What is the correct way to define an arrow function?",
      options: ["function() => {}", "() => {}", "=> function()", "=> {}"],
      correctAnswer: "() => {}"
    },
    {
      question: "Which method is used to convert a JSON string into a JavaScript object?",
      options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
      correctAnswer: "JSON.parse()"
    },
    {
      question: "What is the output of typeof null in JavaScript?",
      options: ["null", "object", "undefined", "boolean"],
      correctAnswer: "object"
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["Number", "Boolean", "Float", "String"],
      correctAnswer: "Float"
    },
    {
      question: "What does the async keyword do in JavaScript?",
      options: ["Makes a function return a promise", "Pauses function execution", "Cancels a promise", "Creates a callback"],
      correctAnswer: "Makes a function return a promise"
    },
    {
      question: "Which method removes the last element from an array and returns that element?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correctAnswer: "pop()"
    }
  ];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an option');
      return;
    }

    // Save the user's answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      question: quizData[currentQuestionIndex].question,
      selected: selectedOption,
      correct: quizData[currentQuestionIndex].correctAnswer,
      isCorrect: selectedOption === quizData[currentQuestionIndex].correctAnswer
    };
    setAnswers(newAnswers);

    // Update score if answer is correct
    if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question or show results
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setAnswers([]);
  };

  if (showResult) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Your Score: {score} / {quizData.length}</Text>
          <Text style={styles.percentageText}>
            Percentage: {Math.round((score / quizData.length) * 100)}%
          </Text>
          
          <Text style={styles.reviewTitle}>Review Answers:</Text>
          {answers.map((answer, index) => (
            <View key={index} style={[
              styles.answerReview,
              answer.isCorrect ? styles.correctAnswer : styles.wrongAnswer
            ]}>
              <Text style={styles.questionReview}>Q{index + 1}: {answer.question}</Text>
              <Text style={styles.yourAnswer}>Your answer: {answer.selected}</Text>
              {!answer.isCorrect && (
                <Text style={styles.correctAnswerText}>Correct answer: {answer.correct}</Text>
              )}
            </View>
          ))}
          
          <TouchableOpacity style={styles.restartButton} onPress={handleRestartQuiz}>
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.quizContainer}>
        <Text style={styles.questionCounter}>
          Question {currentQuestionIndex + 1} of {quizData.length}
        </Text>
        <Text style={styles.questionText}>
          {quizData[currentQuestionIndex].question}
        </Text>
        
        <View style={styles.optionsContainer}>
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOption
              ]}
              onPress={() => handleSelectOption(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex + 1 === quizData.length ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  quizContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionCounter: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 5,
    color: '#666',
    textAlign: 'center',
  },
  percentageText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  answerReview: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  correctAnswer: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  questionReview: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  yourAnswer: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});