import React, { useState, useEffect } from 'react';
import { MBTIResult, Dimension, ScreenState, Question } from './types';
import { analyzePersonality } from './services/geminiService';
import { getRandomQuestions } from './constants';
import Intro from './components/Intro';
import Test from './components/Test';
import Loading from './components/Loading';
import Result from './components/Result';
import TypeLibrary from './components/TypeLibrary';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('INTRO');
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [scores, setScores] = useState<Record<Dimension, number> | null>(null);
  const [userName, setUserName] = useState<string>("");

  // Initialize randomized questions
  const initializeTest = (name: string) => {
    setUserName(name);
    setQuestions(getRandomQuestions());
    setScreen('TEST');
  };

  const calculateType = (finalScores: Record<Dimension, number>): string => {
    const e_i = finalScores.E >= finalScores.I ? 'E' : 'I';
    const s_n = finalScores.S >= finalScores.N ? 'S' : 'N';
    const t_f = finalScores.T >= finalScores.F ? 'T' : 'F';
    const j_p = finalScores.J >= finalScores.P ? 'J' : 'P';
    return `${e_i}${s_n}${t_f}${j_p}`;
  };

  const handleTestComplete = async (finalScores: Record<Dimension, number>) => {
    setScores(finalScores);
    setScreen('LOADING');
    const typeCode = calculateType(finalScores);
    
    // Fetch detailed analysis from Gemini
    const analysis = await analyzePersonality(typeCode);
    setResult(analysis);
    setScreen('RESULT');
  };

  const handleRetry = () => {
    setScreen('INTRO');
    setResult(null);
    setScores(null);
    setUserName("");
  };

  const handleLibrary = () => {
    setScreen('LIBRARY');
  };

  const handleBackFromLibrary = () => {
    if (result && scores) {
      setScreen('RESULT');
    } else {
      setScreen('INTRO');
    }
  };

  return (
    <div className="min-h-screen text-slate-800 selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden">
      {screen === 'INTRO' && <Intro onStart={initializeTest} onLibrary={handleLibrary} />}
      {screen === 'TEST' && <Test questions={questions} onComplete={handleTestComplete} />}
      {screen === 'LOADING' && <Loading />}
      {screen === 'RESULT' && result && scores && (
        <Result 
          result={result} 
          scores={scores}
          userName={userName}
          onRetry={handleRetry} 
          onLibrary={handleLibrary}
        />
      )}
      {screen === 'LIBRARY' && <TypeLibrary onBack={handleBackFromLibrary} />}
    </div>
  );
};

export default App;