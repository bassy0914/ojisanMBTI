import { useState, useCallback } from 'react';
import { SPECTRUMS, questions } from '../data/questions';

const initialAnswers = () =>
  SPECTRUMS.reduce((acc, s) => ({ ...acc, [s]: [] }), {});

export function useAdaptiveMBTI() {
  const [spectrumIndex, setSpectrumIndex] = useState(0);
  const [questionInSpectrum, setQuestionInSpectrum] = useState(0);
  const [spectrumAnswers, setSpectrumAnswers] = useState(initialAnswers);
  const [confirmedResults, setConfirmedResults] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [finalType, setFinalType] = useState(null);
  const [skippedQ3, setSkippedQ3] = useState(0); // track confirmed early

  const currentSpectrum = SPECTRUMS[spectrumIndex];
  const currentQuestion = isComplete
    ? null
    : questions[currentSpectrum]?.[questionInSpectrum];

  // Total questions asked so far (for progress)
  const totalAsked = SPECTRUMS.slice(0, spectrumIndex).reduce((sum, s) => {
    return sum + (spectrumAnswers[s]?.length || (confirmedResults[s] ? 2 : 0));
  }, 0) + questionInSpectrum;

  const maxQuestions = 15;

  const advanceSpectrum = useCallback(
    (typeResult, answers, currentSpectrumKey) => {
      const newResults = { ...confirmedResults, [currentSpectrumKey]: typeResult };
      setConfirmedResults(newResults);

      const nextIdx = spectrumIndex + 1;
      if (nextIdx >= SPECTRUMS.length) {
        // Build final MBTI string
        const full = `${newResults.EI}${newResults.SN}${newResults.TF}${newResults.JP}-${newResults.AT}`;
        setFinalType(full);
        setIsComplete(true);
      } else {
        setSpectrumIndex(nextIdx);
        setQuestionInSpectrum(0);
      }
    },
    [confirmedResults, spectrumIndex]
  );

  const handleAnswer = useCallback(
    (answer) => {
      // answer is 'A' or 'B'
      const q = questions[currentSpectrum][questionInSpectrum];
      const typeAnswer = answer === 'A' ? q.optionA.type : q.optionB.type;
      const prevAnswers = spectrumAnswers[currentSpectrum] || [];
      const newAnswers = [...prevAnswers, typeAnswer];

      setSpectrumAnswers((prev) => ({ ...prev, [currentSpectrum]: newAnswers }));

      if (questionInSpectrum === 0) {
        // Q1 done — go to Q2
        setQuestionInSpectrum(1);
      } else if (questionInSpectrum === 1) {
        // Q2 done
        if (newAnswers[0] === newAnswers[1]) {
          // Both agree — confirmed, skip Q3
          setSkippedQ3((n) => n + 1);
          advanceSpectrum(newAnswers[0], newAnswers, currentSpectrum);
        } else {
          // Disagree — ask Q3
          setQuestionInSpectrum(2);
        }
      } else {
        // Q3 done — majority vote
        const countFirst = newAnswers.filter((a) => a === newAnswers[0]).length;
        const winner = countFirst >= 2 ? newAnswers[0] : newAnswers[1];
        advanceSpectrum(winner, newAnswers, currentSpectrum);
      }
    },
    [currentSpectrum, questionInSpectrum, spectrumAnswers, advanceSpectrum]
  );

  const reset = useCallback(() => {
    setSpectrumIndex(0);
    setQuestionInSpectrum(0);
    setSpectrumAnswers(initialAnswers());
    setConfirmedResults({});
    setIsComplete(false);
    setFinalType(null);
    setSkippedQ3(0);
  }, []);

  return {
    currentSpectrum,
    currentQuestion,
    questionInSpectrum,
    spectrumIndex,
    totalAsked,
    maxQuestions,
    isComplete,
    finalType,
    confirmedResults,
    handleAnswer,
    reset,
  };
}
