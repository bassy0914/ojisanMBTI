import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultScreen from './components/ResultScreen';
import { useAdaptiveMBTI } from './hooks/useAdaptiveMBTI';

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'quiz' | 'result'

  const {
    currentSpectrum,
    currentQuestion,
    questionInSpectrum,
    spectrumIndex,
    isComplete,
    finalType,
    confirmedResults,
    handleAnswer,
    reset,
  } = useAdaptiveMBTI();

  // Move to result screen when quiz completes
  React.useEffect(() => {
    if (isComplete && screen === 'quiz') {
      setScreen('result');
    }
  }, [isComplete, screen]);

  const handleStart = () => setScreen('quiz');

  const handleReset = () => {
    reset();
    setScreen('start');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0f0c1a 0%, #1a1030 50%, #0f0c1a 100%)' }}
    >
      {/* Fixed height viewport wrapper for quiz */}
      <div className="flex flex-col h-screen max-h-screen">
        {screen === 'start' && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <StartScreen onStart={handleStart} />
          </div>
        )}

        {screen === 'quiz' && currentQuestion && (
          <>
            <ProgressBar
              spectrumIndex={spectrumIndex}
              questionInSpectrum={questionInSpectrum}
              confirmedResults={confirmedResults}
            />
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              spectrum={currentSpectrum}
              onAnswer={handleAnswer}
            />
          </>
        )}

        {screen === 'result' && finalType && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <ResultScreen finalType={finalType} onReset={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
}
